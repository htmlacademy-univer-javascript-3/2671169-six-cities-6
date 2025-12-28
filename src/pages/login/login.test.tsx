import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../utils/mocks';
import Login from './login';
import userEvent from '@testing-library/user-event';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<Login />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    const loginButton = screen.getByRole('button', { name: /Sign in/i });
    const navigationLink = screen.getByTestId('random-city-link');

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(navigationLink).toBeInTheDocument();
  });

  it('should render correctly when user enters login and password', async () => {
    const emailElementTestId = 'email-element';
    const passwordElementTestId = 'password-element';
    const expectedEmailValue = 'testuser@mail.ru';
    const expectedPasswordValue = 'qwerty1';

    const withHistoryComponent = withHistory(<Login />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(emailElementTestId),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
  });
});
