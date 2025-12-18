import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { AppRoute, AuthStatus } from '../../const';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/api-actions/user';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const { authorizationStatus } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  useEffect(() => {
    if (authorizationStatus === AuthStatus.Auth) {
      navigate(AppRoute.Root);
    }
  });

  return (
    <div className="page page--gray page--login">
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  ref={passwordRef}
                  placeholder="Password"
                  required
                />
              </div>
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
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
