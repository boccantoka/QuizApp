import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { QuizPage } from '../pages/quiz';
import { PagePaths } from './routes.constants';
import { ErrorPage } from '../pages/error';
import { RootLayout } from '../layouts';
import {
  QuestionDifficulty,
  QuestionType,
  fetchQuestions,
} from '../services/quiz';

export const questionLoader = async () => {
  try {
    return await fetchQuestions(
      10,
      QuestionDifficulty.Hard,
      QuestionType.Boolean
    );
  } catch (error) {
    throw new Error('Can not fetch questions');
  }
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PagePaths.HomePage,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: PagePaths.QuizPage,
        element: <QuizPage />,
        loader: questionLoader,
      },
      {
        path: '/*',
        element: <ErrorPage message="Page not found" />,
      },
    ],
  },
]);
