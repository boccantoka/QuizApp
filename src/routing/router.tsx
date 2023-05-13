import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { QuizPage } from '../pages/quiz';
import { PagePaths } from './routes.constants';

export const router = createBrowserRouter([
  {
    path: PagePaths.HomePage,
    element: <HomePage />,
  },
  {
    path: PagePaths.QuizPage,
    element: <QuizPage />,
  },
]);
