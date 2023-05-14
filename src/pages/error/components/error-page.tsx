import { Link, useRouteError } from 'react-router-dom';

import { PagePaths } from '../../../routing';

const getErrorMsg = (error: unknown, message?: string) => {
  console.log('asd', message);
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
    <main>
      <h1>Error occurred</h1>
      <p>{getErrorMsg(error, message)}</p>
      <Link to={PagePaths.HomePage}>Go to home page</Link>
    </main>
  );
};
