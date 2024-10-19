import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="bg-white p-[var(--app-padding-phone)] app-min-h-screen md:p-[var(--app-padding)]">
      <Outlet />
    </div>
  );
}

export default AppLayout;
