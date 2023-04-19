import { Outlet } from 'react-router';

export function PublicLayout() {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
}
