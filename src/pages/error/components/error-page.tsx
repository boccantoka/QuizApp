import { Link, useRouteError } from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import { PagePaths } from '../../../routing';

import './error-page.css';

const getErrorMsg = (error: unknown, message?: string) => {
  if (message) {
    return message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unexpected error';
};

interface ErrorPageProps {
  // eslint-disable-next-line react/require-default-props
  message?: string;
}

export const ErrorPage = ({ message }: ErrorPageProps): JSX.Element => {
  const error = useRouteError();

  return (
    <main className="error-page">
      <Typography variant="h3" component="h1" gutterBottom>
        Error occurred
      </Typography>
      <Typography variant="body1" gutterBottom>
        {getErrorMsg(error, message)}
      </Typography>
      <Button
        variant="contained"
        component={Link}
        color="primary"
        to={PagePaths.HomePage}
      >
        Go to home page
      </Button>
    </main>
  );
};
