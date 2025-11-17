import PlacesSorting from '../../components/places-sorting/places-sorting';
import MapComponent from '../../components/map-component/map-component';
import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';
import { useDispatch, useSelector } from 'react-redux';
import { PlaceCardI, PointI } from '../../types/offer-type';
import { SortingOptionsType } from '../../types/const';
import { useMemo, useState } from 'react';
import { changeCity } from '../../redux/slices/offers';
import { RootState } from '../../redux';

export default function MainPage(): JSX.Element {
  const dispatch = useDispatch();

  const offers = useSelector((state: RootState) => state.offers.offers);
  const cityName = useSelector((state: RootState) => state.offers.city);

  const cityOffers = useMemo(() =>
    offers.filter((offer) => offer.city.name === cityName),
  [offers, cityName]);

  const currentCity = cityOffers[0]?.city;

  const points = cityOffers.map((offer) => offer.location);
  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const handleChangeCity = (city: string) => {
    dispatch(changeCity(city));
  };

  const [option, setOption] = useState<SortingOptionsType>('Popular');

  const sortedOffers = useMemo(() => {
    switch (option) {
      case 'Price: low to high':
        setOption(option);
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => a.price - b.price);
      case 'Price: high to low':
        setOption(option);
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => b.price - a.price);
      case 'Top rated first':
        setOption(option);
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => b.rating - a.rating);
      default:
        setOption(option);
        return cityOffers;
    }
  }, [cityOffers, option]);

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              changeCity={handleChangeCity}
              currentCity={cityName}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {cityOffers.length} places to stay in {cityName}
              </b>

              <PlacesSorting
                sortingHandler={setOption}
                activeOption={option}
              />

              <OffersList
                offers={sortedOffers}
                size
                cardClass="cities"
                onListItemHover={setSelectedPoint}
                onListItemBlur={setSelectedPoint}
              />

            </section>
            <div className="cities__right-section">
              {currentCity && (
                <MapComponent
                  city={currentCity}
                  points={points}
                  selectedPoint={selectedPoint}
                  mapClass="cities__map"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
