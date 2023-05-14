import { CircularProgress } from '@mui/material';

import './loading-indicator.css';

export const LoadingIndicator = () => {
  return (
    <div className="loading-indicator-wrapper">
      <CircularProgress />
    </div>
  );
};
