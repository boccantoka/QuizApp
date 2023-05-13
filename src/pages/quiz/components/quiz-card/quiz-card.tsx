import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from '@mui/material';

export const QuizCard = (): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Question
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Button 1
        </Button>
        <Button variant="contained" color="secondary">
          Button 2
        </Button>
      </CardActions>
    </Card>
  );
};
