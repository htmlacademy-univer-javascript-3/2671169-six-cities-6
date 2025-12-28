import { useEffect, useRef, useState } from 'react';
import { SORTING_OPTIONS, SortingOptionsType } from '../../const';

export interface PlacesSortingProps {
  onSortingHandler: (sortType: SortingOptionsType) => void;
  activeOption: SortingOptionsType;
}

export default function PlacesSorting({ onSortingHandler, activeOption }: PlacesSortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortingRef = useRef<HTMLFormElement | null>(null);

  const handleOpening = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let isMounted = true;
    const handleClickOutside = (event: MouseEvent) => {
      if (sortingRef.current && !sortingRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isMounted) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      isMounted = false;
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form
      className="places__sorting"
      ref={sortingRef}
      data-testid='places-sorting'
    >
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type" tabIndex={0}
        onClick={handleOpening}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={
        `places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`
      }
      >
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option}
            className={
              `places__option ${option === activeOption ? 'places__option--active' : ''}`
            }
            tabIndex={0}
            onClick={() => {
              onSortingHandler(option);
              handleOpening();
            }}
            data-testid="place-option"
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
