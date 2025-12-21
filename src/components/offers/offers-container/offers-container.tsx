import { MapComponentMemoized, OffersListMemoized } from '../../../hocs/memo';
import { useCallback, useMemo, useState } from 'react';
import { SortingOptionsType, SortOptions } from '../../../const';
import { PlaceCardI, PointI } from '../../../types/offer';
import { useAppSelector } from '../../../hooks/redux';
import PlacesSorting from '../../places-sorting/places-sorting';

export default function OffersContainer() {
  const { offers } = useAppSelector((state) => state.offers);
  const cityName = useAppSelector((state) => state.offers.city);

  const cityOffers = useMemo(() => offers.filter((offer) => offer.city.name === cityName), [offers, cityName]);

  const currentCity = cityOffers[0]?.city;
  const points = cityOffers.map((offer) => offer.location);
  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const [option, setOption] = useState<SortingOptionsType>(SortOptions.Popular);

  const sortedOffers = useMemo(() => {
    switch (option) {
      case SortOptions.PriceLowToHigh:
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => a.price - b.price);
      case SortOptions.PriceHighToLow:
        return [...cityOffers].sort((a: PlaceCardI, b: PlaceCardI) => b.price - a.price);
      case SortOptions.TopRated:
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
          onSortingHandler={setOption}
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
          <MapComponentMemoized
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
