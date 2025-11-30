import { useEffect } from 'react';
import AppRouter from '../../router/router';
import { authorizeUser } from '../../api/user';
import { useAppDispatch } from '../../hooks/redux';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authorizeUser());
  }, [dispatch]);

  return (
    <AppRouter />
  );
}
