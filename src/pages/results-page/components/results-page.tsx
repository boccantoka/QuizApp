import { Typography, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { Answer } from '../../../services/quiz';

import './result-page.css';

interface ResultsPageProps {
  answers: Answer[];
}

export const ResultsPage = ({ answers }: ResultsPageProps) => {
  return (
    <Box component="main" className="results-page">
      <Typography variant="h2" className="results">
        {`${answers.filter((answer) => answer.isCorrect).length} / ${
          answers.length
        }`}
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
    </Box>
  );
};
