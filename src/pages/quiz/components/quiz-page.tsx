import { useState, useEffect } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { QuizCard } from './quiz-card/quiz-card';

import {
  Answer,
  Question,
  QuestionDifficulty,
  QuestionType,
  fetchQuestions,
} from '../../../services/quiz';
import { ResultsPage } from '../../results-page/components/results-page';

export const QuizPage = (): JSX.Element => {
  const questions = useLoaderData() as Question[];
  const { state } = useNavigation();
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleAnswer = (question: string, value: boolean) => {
    setAnswers((currentAnswers) => [
      ...currentAnswers,
      {
        question,
        isCorrect:
          questions[answers.length].correct_answer ===
          (value ? 'True' : 'False'),
      },
    ]);
  };

  if (state === 'loading') {
    return <div>loading</div>;
  }

  if (answers.length === 10) {
    return <ResultsPage answers={answers} />;
  }

  return (
    <main>
      <QuizCard
        question={questions[answers.length]}
        handleAnswer={handleAnswer}
      />
    </main>
  );
};

export default QuizPage;
