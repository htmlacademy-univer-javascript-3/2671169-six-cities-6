import { render, screen } from '@testing-library/react';
import { CITIES } from '../../const';
import CitiesList, { CitiesListProps } from './cities-list';
import userEvent from '@testing-library/user-event';

describe('CitiesList', () => {
  const mockChangeCity: CitiesListProps['onChangeCity'] = vi.fn();

  it('should render list of cities', () => {
    render(
      <CitiesList
        currentCity={CITIES[0]}
        onChangeCity={mockChangeCity}
      />
    );

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should add "active" status to tab with current city', () => {
    const currentCity = CITIES[0];

    render(
      <CitiesList
        currentCity={currentCity}
        onChangeCity={mockChangeCity}
      />
    );

    const activeCityLink = screen
      .getByText(currentCity)
      .closest('a');

    expect(activeCityLink).toHaveClass('tabs__item--active');
  });

  it('should not add "active" status to non-active cities', () => {
    const currentCity = CITIES[0];

    render(
      <CitiesList
        currentCity={currentCity}
        onChangeCity={mockChangeCity}
      />
    );

    const inactiveCityLink = screen
      .getByText(CITIES[1])
      .closest('a');

    expect(inactiveCityLink).not.toHaveClass('tabs__item--active');
  });

  it('changeCity should be called when change prop currentCity', async () => {
    render(
      <CitiesList
        currentCity={CITIES[0]}
        onChangeCity={mockChangeCity}
      />
    );

    const inactiveCityLink = screen
      .getByText(CITIES[1]);

    await userEvent.click(inactiveCityLink);

    expect(mockChangeCity).toBeCalled();
    expect(mockChangeCity).toHaveBeenCalledWith(CITIES[1]);
  });
});
