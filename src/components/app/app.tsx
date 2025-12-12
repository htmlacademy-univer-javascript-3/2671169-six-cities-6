import { useAppDispatch } from '../../hooks/redux';
import { authorizeUser } from '../../store/api-actions/user';
import { useEffect } from 'react';
import AppRouter from '../../router/router';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authorizeUser());
  }, [dispatch]);

  return (
    <AppRouter />
  );
}
