import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';
import { Question } from '../../../../services/quiz';

import './quiz-card.css';

interface QuizCardProps {
  question: Question;
  handleAnswer: (question: string, value: boolean) => void;
}

export const QuizCard = ({
  handleAnswer,
  question,
}: QuizCardProps): JSX.Element => {
  return (
    <Card className="quiz-card">
      <CardContent>
        <Typography variant="h5" component="div">
          {question.question}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAnswer(question.question, true)}
          fullWidth
        >
          true
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleAnswer(question.question, false)}
          fullWidth
        >
          false
        </Button>
      </CardActions>
    </Card>
  );
};
