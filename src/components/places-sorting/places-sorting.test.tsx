import { render, screen } from '@testing-library/react';
import PlacesSorting from './places-sorting';
import { SORTING_OPTIONS, SortingOptionsType } from '../../const';
import userEvent from '@testing-library/user-event';

describe('Component: PlacesSorting', () => {
  const sortingHandler = vi.fn();
  const placesOptions: SortingOptionsType[] = SORTING_OPTIONS;

  it('should render correctly', () => {
    render(
      <PlacesSorting
        sortingHandler={sortingHandler}
        activeOption={placesOptions[0]}
      />
    );

    const optionsRendered = screen.getAllByTestId('place-option');
    const activeOption = optionsRendered.find((o) => o.textContent === placesOptions[0]);

    expect(activeOption).toBeInTheDocument();
    expect(activeOption).toHaveClass('places__option places__option--active');
  });

  it('should call "sortingHandler" when user changes filter', async () => {
    render(
      <PlacesSorting
        sortingHandler={sortingHandler}
        activeOption={placesOptions[0]}
      />
    );
    const expectedOption = screen.getByText(placesOptions[1]);
    await userEvent.click(expectedOption);

    expect(sortingHandler).toBeCalledTimes(1);
  });
});
