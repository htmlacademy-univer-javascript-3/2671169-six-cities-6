import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthStatus;
}

export default function PrivateRoute({ children, authorizationStatus}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}
