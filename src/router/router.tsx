import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../types/const';
import { offers } from '../mocks/offers';
import { favorites } from '../mocks/favorites';
import { city } from '../mocks/city';
import MainPage from '../pages/main/main';
import Favorites from '../pages/favorites/favorites';
import Login from '../pages/login/login';
import Offer from '../pages/offer/offer';
import Layout from '../components/layout/layout';
import NotFoundScreen from '../components/notFoundScreen/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage offers={offers} city={city} />
      },
      {
        path: AppRoute.Favorites,
        element: (
          <PrivateRoute
            authStatus={AuthStatus.NotAuth}
          >
            <Favorites offers={favorites} />
          </PrivateRoute>
        )
      },
      {
        path: AppRoute.Login,
        element: <Login />
      },
      {
        path: AppRoute.Offer,
        element: <Offer />
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundScreen />
  }
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
