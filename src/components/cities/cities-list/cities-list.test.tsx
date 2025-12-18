import { render, screen } from '@testing-library/react';
import CitiesList from './cities-list';
import { CITIES } from '../../../const';

describe('CitiesList', () => {
  const mockChangeCity = vi.fn();


  it('should render list of cities', () => {
    render(
      <CitiesList
        currentCity={CITIES[0]}
        changeCity={mockChangeCity}
      />
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should add class "active" to tab with current city', () => {
    const currentCity = CITIES[2];

    render(
      <CitiesList
        currentCity={currentCity}
        changeCity={mockChangeCity}
      />
    );

    const activeCityLink = screen
      .getByText(currentCity)
      .closest('a');

    expect(activeCityLink).toHaveClass('tabs__item--active');
  });

  it('should not add class "active" to non-active cities', () => {
    const currentCity = CITIES[0];

    render(
      <CitiesList
        currentCity={currentCity}
        changeCity={mockChangeCity}
      />
    );

    const inactiveCityLink = screen
      .getByText(CITIES[1])
      .closest('a');

    expect(inactiveCityLink).not.toHaveClass('tabs__item--active');
  });
});
