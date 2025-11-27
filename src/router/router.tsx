import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoute } from '../types/const';
import { nearPlaces } from '../mocks/near-places';
import NotFoundScreen from '../components/not-found-screen/not-found-screen';
import PrivateRoute from '../components/private-route/private-route';
import Favorites from '../pages/favorites/favorites';
import MainPage from '../pages/main/main';
import Layout from '../components/layout/layout';
import Login from '../pages/login/login';
import Offer from '../pages/offer/offer';

const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: AppRoute.Favorites,
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        )
      },
      {
        path: AppRoute.Login,
        element: <Login />
      },
      {
        path: AppRoute.Offer,
        element: <Offer nearPlaces={nearPlaces}/>
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
