import { useEffect, useRef, useState } from 'react';
import { SORTING_OPTIONS, SortingOptionsType } from '../../const';

interface PlacesSortingProps {
  sortingHandler: (sortType: SortingOptionsType) => void;
  activeOption: string;
}

export default function PlacesSorting({ sortingHandler, activeOption }: PlacesSortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortingRef = useRef<HTMLFormElement | null>(null);

  const handleOpening = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortingRef.current && !sortingRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <form className="places__sorting" action="#" method="get" ref={sortingRef}>
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
      <ul className={`places__options places__options--custom 
                ${isOpen ? 'places__options--opened' : ''}`}
      >
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option
                            ${option === activeOption ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => {
              sortingHandler(option);
              handleOpening();
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}
