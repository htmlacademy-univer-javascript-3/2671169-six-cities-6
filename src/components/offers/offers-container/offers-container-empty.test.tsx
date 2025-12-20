import { render, screen } from '@testing-library/react';
import CitiesContainerEmpty from './offers-container-empty';

describe('Component: CitiesContainerEmpty', () => {
  it('should render empty state with city name', () => {
    const city = 'Amsterdam';

    render(<CitiesContainerEmpty city={city} />);

    const expectedStatusText = /No places to stay available/i;
    const expectedDescriptionText = `We could not find any property available at the moment in ${city}`;

    expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });

  it('should render correct layout containers', () => {
    render(<CitiesContainerEmpty city="Paris"/>);

    const citiesContainer = screen.getByTestId('cities-empty');
    const rightSection = screen.getByTestId('right-section');

    expect(citiesContainer).toBeInTheDocument();
    expect(rightSection).toBeInTheDocument();
  });
});
