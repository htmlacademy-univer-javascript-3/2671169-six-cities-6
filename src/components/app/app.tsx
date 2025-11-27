import { useEffect } from 'react';
import AppRouter from '../../router/router';
import { loginUser } from '../../api/login';
import { useAppDispatch } from '../../hooks/redux';
import { getOffers } from '../../api/get-offers';

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loginUser());
    dispatch(getOffers());
  }, [dispatch]);
  return (
    <AppRouter />
  );
}
