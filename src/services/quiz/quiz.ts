import he from 'he';
import {
  Question,
  QuestionDifficulty,
  QuestionType,
  QuizApiQuestionEndpointResponse,
  QuizApiStatusCodes,
  QuizApiTokenEndpointResponse,
} from './models';
import { QUIZ_API_ENDPOINT, QUIZ_API_TOKEN_ENDPOINT } from './quiz.constants';

// In a real world application session token should be stored as a HTTP only cookie
export const setNewQuizApiSessionToken = async (): Promise<void> => {
  const apiEndpoint = `${QUIZ_API_TOKEN_ENDPOINT}?command=request`;

  const response = (await (
    await fetch(apiEndpoint)
  ).json()) as QuizApiTokenEndpointResponse;

  if (response.response_code === 0) {
    sessionStorage.setItem('quizApiSessionToken', response.token);
  } else {
    throw new Error('Generating Session token failed.');
  }
};

const getQuizApiSessionToken = (): string | null =>
  sessionStorage.getItem('quizApiSessionToken');

export const resetSessionToken = async (): Promise<void> => {
  const sessionToken = getQuizApiSessionToken();

  if (!sessionToken) {
    await setNewQuizApiSessionToken();
  }

  const apiEndpoint = `${QUIZ_API_TOKEN_ENDPOINT}?command=reset&token=${sessionToken}`;
  const response = (await (
    await fetch(apiEndpoint)
  ).json()) as QuizApiTokenEndpointResponse;

  if (response.response_code !== 0) {
    throw new Error('Resetting token failed.');
  }
};

const handleFetchQuestionsError = (errorCode: number): void => {
  switch (errorCode) {
    case QuizApiStatusCodes.NoResults:
      throw new Error(
        "Could not return results. The API doesn't have enough questions for your query."
      );
    case QuizApiStatusCodes.InvalidParameter:
      throw new Error("Arguments passed in aren't valid.");
    case QuizApiStatusCodes.TokenNotFound:
      throw new Error('Session Token does not exist.');
    case QuizApiStatusCodes.TokenEmpty:
      throw new Error(
        'Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.'
      );
    default:
      throw new Error('Unknown error occurred.');
  }
};

const handleSessionTokenError = async (errorCode: number): Promise<void> => {
  if (errorCode === QuizApiStatusCodes.TokenNotFound) {
    await setNewQuizApiSessionToken();
    return;
  }

  if (errorCode === QuizApiStatusCodes.TokenEmpty) {
    await resetSessionToken();
  }
};

export const fetchQuestions = async (
  amount: number,
  difficulty: QuestionDifficulty,
  type: QuestionType
): Promise<QuizApiQuestionEndpointResponse> => {
  if (!getQuizApiSessionToken()) {
    await setNewQuizApiSessionToken();
  }

  let apiEndpoint = `${QUIZ_API_ENDPOINT}/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;

  const sessionToken = getQuizApiSessionToken();

  if (sessionToken) {
    apiEndpoint += `&token=${sessionToken}`;
  }

  return (await (
    await fetch(apiEndpoint)
  ).json()) as QuizApiQuestionEndpointResponse;
};

export const getQuestions = async (
  amount: number,
  difficulty: QuestionDifficulty,
  type: QuestionType
): Promise<Question[]> => {
  let response = await fetchQuestions(amount, difficulty, type);

  if (
    response.response_code === QuizApiStatusCodes.TokenEmpty ||
    response.response_code === QuizApiStatusCodes.TokenNotFound
  ) {
    await handleSessionTokenError(response.response_code);
    response = await fetchQuestions(amount, difficulty, type);
  }

  if (response.response_code !== QuizApiStatusCodes.Success) {
    handleFetchQuestionsError(response.response_code);
  }

  return response.results.map((question) => ({
    ...question,
    question: he.decode(question.question),
  }));
};
