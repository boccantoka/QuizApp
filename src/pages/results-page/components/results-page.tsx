import { useContext } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

import './result-page.css';
import { Link } from 'react-router-dom';
import { AnswerContext } from '../../../contexts';
import { PagePaths } from '../../../routing';
import { Answer } from '../../../services/quiz';

const getScorePointText = (answers: Answer[]): string => {
  const correctAnswers = answers.filter((answer) => answer.isCorrect).length;
  return `${correctAnswers} / ${answers.length} Nice job 🏆`;
};

export const ResultsPage = () => {
  const { answers } = useContext(AnswerContext);

  return (
    <Box component="main" className="results-page">
      <Typography variant="h2" className="results">
        {getScorePointText(answers)}
      </Typography>
      {answers.map((answer) => (
        <div key={answer.question} className="results-page-answer-row">
          {answer.isCorrect ? (
            <Add color="success" className="results-page-answer-row-icon" />
          ) : (
            <Remove color="error" className="results-page-answer-row-icon" />
          )}
          <Typography
            component="span"
            className="results-page-answer-row-answer"
          >
            {answer.question}
          </Typography>
        </div>
      ))}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        fullWidth
        to={PagePaths.QuizPage}
      >
        play again?
      </Button>
    </Box>
  );
};
