import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { withHistory } from '../../utils/mock-component';
import { AppRoute, AuthStatus } from '../../const';
import PrivateRoute from './private-route';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render component for public route, when user is not authorized', () => {
    const expectedText = 'this is public route';
    const notExpectedText = 'private route';

    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute authorizationStatus={AuthStatus.NotAuth}>
            <span>{notExpectedText}</span>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Login} element={<span>{expectedText}</span>} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user is authorized', () => {
    const expectedText = 'this is public route';
    const notExpectedText = 'private route';

    const preparedComponent = withHistory(
      <Routes>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthStatus.Auth}>
              <span>{expectedText}</span>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Login} element={<span>{notExpectedText}</span>} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });


});
