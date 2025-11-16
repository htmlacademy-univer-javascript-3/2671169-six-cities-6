import { CITIES } from "../../types/const";

interface CitiesListProps {
  changeCity: (cityName: string) => void;
  currentCity: string;
}

export default function CitiesList({ changeCity, currentCity }: CitiesListProps): JSX.Element {
  
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              changeCity(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
