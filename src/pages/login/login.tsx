import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AppRoute, AuthStatus, CITIES } from '../../const';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/api-actions/user';
import { changeCity } from '../../store/offers-data/offers-data';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { authorizationStatus } = useAppSelector((state) => state.user);

  const [validationError, setValidationError] = useState('');

  const randomCity = useMemo(() => CITIES[Math.floor(Math.random() * CITIES.length)], []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value;
      const email = emailRef.current.value;
      const isValidPassword = /[A-Za-z]/.test(password) && /\d/.test(password);

      if (!isValidPassword) {
        setValidationError('Password must contain at least one letter and one number');
        return;
      }

      setValidationError('');
      dispatch(loginUser({ email, password }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (authorizationStatus === AuthStatus.Auth) {
        navigate(AppRoute.Root);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [authorizationStatus, navigate]);

  const handleRandomCityClick = () => {
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor='email'>E-mail</label>
                <input
                  className="login__input form__input"
                  id="email"
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Email"
                  data-testid='email-element'
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor='password'>Password</label>
                <input
                  className="login__input form__input"
                  id="password"
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="Password"
                  data-testid='password-element'
                  required
                />
              </div>
              {validationError &&
                <p
                  style={{ color: 'red' }}
                >
                  {validationError}
                </p>}
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                className="locations__item-link"
                onClick={handleRandomCityClick}
              >
                <span data-testid="random-city-link">{randomCity}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
