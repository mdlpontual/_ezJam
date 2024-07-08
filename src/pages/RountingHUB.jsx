import { createBrowserRouter } from 'react-router-dom';
import HomePage from './Home/HomePage.jsx';
import LoginPage from './Login/LoginPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const routes = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
      errorElement: <NotFoundPage />
    },
    {
      path: '/loginpage',
      element: <LoginPage />,
      errorElement: <NotFoundPage />
    },
  ]);

export default routes;