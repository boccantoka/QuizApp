import { Outlet } from 'react-router-dom';

import './root-layout.css';

export const RootLayout = () => {
  return (
    <div className="page-wrapper">
      <Outlet />
    </div>
  );
};
