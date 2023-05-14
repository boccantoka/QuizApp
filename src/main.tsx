import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing/router';
import { AnswersProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AnswersProvider>
      <RouterProvider router={router} />
    </AnswersProvider>
  </React.StrictMode>
);
