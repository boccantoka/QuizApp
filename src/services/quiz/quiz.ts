import he from 'he';

export type Question = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
  type: string;
  question: string;
};

export type Answer = {
  isCorrect: boolean;
  question: string;
};

export enum QuestionType {
  Multiple = 'multiple',
  Boolean = 'boolean',
}

export enum QuestionDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

const QUIZ_API_ENDPOINT = 'https://opentdb.com';
export interface QuizApiQuestionEndpointResponse {
  results: Question[];
  response_code: number;
}

export interface QuizApiTokenEndpointResponse {
  response_code: number;
  token: string;
}

// In a real world application session token should be stored as a HTTP only cookie
export const setNewQuizApiSessionToken = async (): Promise<void> => {
  const apiEndpoint = `${QUIZ_API_ENDPOINT}/api_token.php?command=request`;

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

  const apiEndpoint = `${QUIZ_API_ENDPOINT}/api_token.php?command=reset&token=${sessionToken}`;
  const response = (await (
    await fetch(apiEndpoint)
  ).json()) as QuizApiTokenEndpointResponse;

  if (response.response_code !== 0) {
    throw new Error('Resetting token failed.');
  }
};

const handleFetchQuestionsError = async (errorCode: number): Promise<void> => {
  switch (errorCode) {
    case 1:
      throw new Error(
        "Could not return results. The API doesn't have enough questions for your query."
      );
    case 2:
      throw new Error("Arguments passed in aren't valid.");
    case 3:
      await setNewQuizApiSessionToken();
      break;
    case 4:
      await resetSessionToken();
      break;
    default:
      throw new Error('Unknown error occurred.');
  }
};

export const fetchQuestions = async (
  amount: number,
  difficulty: QuestionDifficulty,
  type: QuestionType
): Promise<Question[]> => {
  if (!getQuizApiSessionToken()) {
    await setNewQuizApiSessionToken();
  }

  // todo util
  let apiEndpoint = `${QUIZ_API_ENDPOINT}/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;

  const sessionToken = getQuizApiSessionToken();

  if (sessionToken) {
    apiEndpoint += `&token=${sessionToken}`;
  }

  const response = (await (
    await fetch(apiEndpoint)
  ).json()) as QuizApiQuestionEndpointResponse;

  if (response.response_code !== 0) {
    await handleFetchQuestionsError(response.response_code);
    // todo add comment
    return fetchQuestions(amount, difficulty, type);
  }

  // todo write util
  return response.results.map((question) => ({
    ...question,
    question: he.decode(question.question),
  }));
};
