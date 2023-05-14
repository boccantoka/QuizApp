import { useState, useEffect, useContext } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import { QuizCard } from '../quiz-card/quiz-card';
import { quizApiConfig } from '../../../../configs/quiz-config';

import {
  Answer,
  Question,
  QuestionDifficulty,
  QuestionType,
  fetchQuestions,
} from '../../../../services/quiz';
import { AnswerContext } from '../../../../contexts';
import { PagePaths } from '../../../../routing';

import './quiz-page.css';
import { LoadingIndicator } from '../../../../components';

export const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { answers, setAnswers } = useContext(AnswerContext);
  const { questionNumber, questionDifficulty, questionType } = quizApiConfig;

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuestions(
          questionNumber,
          questionDifficulty,
          questionType
        );

        setQuestions(fetchedQuestions);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg('Error occurred during the fetching of questions');
        }
      }
    };

    if (answers.length) {
      setAnswers([]);
    }
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // errorElement does not gets rendered if the error occurs in a useEffect
  if (errorMsg) {
    throw new Error(errorMsg);
  }

  if (!questions.length) {
    return <LoadingIndicator />;
  }

  const handleAnswer = (question: string, value: boolean) => {
    let shouldNavigate = false;
    setAnswers((currentAnswers) => {
      if (currentAnswers.length === 9) {
        shouldNavigate = true;
      }

      return [
        ...currentAnswers,
        {
          question,
          isCorrect:
            questions[answers.length].correct_answer ===
            (value ? 'True' : 'False'),
        },
      ];
    });

    if (shouldNavigate) {
      navigate(PagePaths.ResultPage);
    }
  };

  const currentQuestion = questions[answers.length];

  return (
    <main className="quiz-page">
      <Typography variant="h4" className="question-category">
        {currentQuestion.category}
      </Typography>
      <QuizCard question={currentQuestion} handleAnswer={handleAnswer} />
      <Typography variant="h4" className="question-counter">
        {`${answers.length + 1} / ${questions.length}`}
      </Typography>
    </main>
  );
};

export default QuizPage;
