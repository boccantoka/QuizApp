import { Link } from 'react-router-dom';
import { PagePaths } from '../../../routing';

export const HomePage = (): JSX.Element => {
  return (
    <main>
      <h1>Welcome to the Trivia Challenge!</h1>
      <p>You will be presented with 10 True or False questions.</p>
      <p>Can you score 100%?</p>
      <Link to={PagePaths.QuizPage}>Begin</Link>
    </main>
  );
};
