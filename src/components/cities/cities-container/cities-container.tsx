import { useCallback, useMemo, useState } from 'react';
import { SortingOptionsType } from '../../../types/const';
import { PlaceCardI, PointI } from '../../../types/offer-type';
import { useAppSelector } from '../../../hooks/redux';
import { OffersListMemoized } from '../../../hocs';
import PlacesSorting from '../../places-sorting/places-sorting';
import MapComponent from '../../map-component/map-component';

export default function CitiesContainer() {
  const offers = useAppSelector((state) => state.offers.offers);
  const cityName = useAppSelector((state) => state.offers.city);

  const cityOffers = useMemo(() => offers.filter((offer) => offer.city.name === cityName), [offers, cityName]);

  const currentCity = cityOffers[0]?.city;
  const points = cityOffers.map((offer) => offer.location);
  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const [option, setOption] = useState<SortingOptionsType>('Popular');

  const sortedOffers = useMemo(() => {
    switch (option) {
      case 'Price: low to high':
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => a.price - b.price);
      case 'Price: high to low':
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => b.price - a.price);
      case 'Top rated first':
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => b.rating - a.rating);
      default:
        return cityOffers;
    }
  }, [cityOffers, option]);

  const handleListItemBlur = useCallback(() => {
    setSelectedPoint(undefined);
  }, []);

  const handleListItemHover = useCallback((offer: PlaceCardI | undefined) => {
    const currentPoint = offer?.location;
    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  }, []);

  return (
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

        <OffersListMemoized
          offers={sortedOffers}
          size
          cardClass="cities"
          onListItemHover={handleListItemHover}
          onListItemBlur={handleListItemBlur}
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
  );
}
