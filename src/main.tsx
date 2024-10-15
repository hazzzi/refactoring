import UserManagement from '@/app.feature/userManagement/screen/UserManagement';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserDashboard from './app.feature/user/screen/UserDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/user-management",
    element: <UserManagement />,
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
