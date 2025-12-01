import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AppRoute, AuthStatus } from '../../types/const';
import { useEffect } from 'react';
import { getFavorite } from '../../api/favorite';

function HeaderNavigation() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.user.authorizationStatus);
  const user = useAppSelector((state) => state.user.user);
  const favorites = useAppSelector((state) => state.offers.favorites);

  const location = useLocation();

  useEffect(() => {
    if (auth) {
      dispatch(getFavorite());
    }
  }, [dispatch, auth]);

  if (auth === AuthStatus.Unknown && location.pathname !== '/login') {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/login" >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__login">Sign in</span>
          </Link>
        </li>
      </ul>
    );
  } else if (auth === AuthStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">
              {user?.email}
            </span>
            <span className="header__favorite-count">{favorites.length}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#">
            <span className="header__signout">
              Sign out
            </span>
          </a>
        </li>
      </ul>
    );
  }
}


export default function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.Root}>
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <HeaderNavigation />
          </nav>
        </div>
      </div>
    </header >
  );
}
