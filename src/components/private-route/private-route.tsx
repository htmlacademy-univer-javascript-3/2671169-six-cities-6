import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../types/const';
import { useAppSelector } from '../../hooks/redux';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  return (
    authStatus
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
