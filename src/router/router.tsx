import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../types/const';
import { offers } from '../mocks/offers';
import { favorites } from '../mocks/favorites';
import { reviews } from '../mocks/reviews';
import { nearPlaces } from '../mocks/near-places';
import MainPage from '../pages/main/main';
import Favorites from '../pages/favorites/favorites';
import Login from '../pages/login/login';
import Offer from '../pages/offer/offer';
import Layout from '../components/layout/layout';
import NotFoundScreen from '../components/not-found-screen/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage offers={offers} />
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
        element: <Offer reviews={reviews} nearPlaces={nearPlaces}/>
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
