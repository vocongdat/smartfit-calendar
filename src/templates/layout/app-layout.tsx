import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="app-canvas app-min-h-screen text-content">
      <Outlet />
    </div>
  );
}

export default AppLayout;
