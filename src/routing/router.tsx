import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { QuizPage } from '../pages/quiz';
import { PagePaths } from './routes.constants';
import { ErrorPage } from '../pages/error';
import { RootLayout } from '../layouts';
import { ResultsPage } from '../pages/results-page';

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
      },
      {
        path: PagePaths.ResultPage,
        element: <ResultsPage />,
      },
      {
        path: '/*',
        element: <ErrorPage message="Page not found" />,
      },
    ],
  },
]);
