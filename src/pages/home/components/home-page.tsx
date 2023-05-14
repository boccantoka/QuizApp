import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { PagePaths } from '../../../routing';

import './home-page.css';

export const HomePage = (): JSX.Element => {
  return (
    <main className="home-page-wrapper">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Trivia Challenge!
      </Typography>
      <Typography variant="body1" paragraph>
        You will be presented with 10 True or False questions.
      </Typography>
      <Typography variant="body1" paragraph>
        Can you score 100%?
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={PagePaths.QuizPage}
      >
        Begin
      </Button>
    </main>
  );
};
