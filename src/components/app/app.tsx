import { useAppDispatch } from '../../hooks/redux';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { authorizeUser } from '../../store/api-actions/user';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import MainPage from '../../pages/main/main';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authorizeUser());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index path={AppRoute.Root} element={<MainPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<Login />} />

          <Route path={AppRoute.Offer} element={<Offer />} />
        </Route>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </HelmetProvider>
  );
}
