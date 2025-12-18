import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import NotFoundScreen from './not-found-screen';

describe('NotFoundScreen', () => {
  it('renders 404 title and text', () => {
    const preparedComponent = withHistory(<NotFoundScreen />);
    render(preparedComponent);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders link to home page', () => {
    const preparedComponent = withHistory(<NotFoundScreen />);
    render(preparedComponent);

    const link = screen.getByRole('link', { name: /back to home page/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('has correct css classes', () => {
    const preparedComponent = withHistory(<NotFoundScreen />);
    render(preparedComponent);

    const expectedContainer = screen.getByTestId('not_found-container');
    expect(expectedContainer).toBeInTheDocument();
  });
});
