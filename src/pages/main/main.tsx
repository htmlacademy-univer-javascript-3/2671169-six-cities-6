import PlacesSorting from '../../components/places-sorting/places-sorting';
import MapComponent from '../../components/map-component/map-component';
import CitiesList from '../../components/cities-list/cities-list';
import OffersList from '../../components/offers-list/offers-list';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../../redux/slices/offers';
import { RootState } from '../../redux';
import { useMemo, useState } from 'react';
import { PointI } from '../../types/offer-type';

export default function MainPage(): JSX.Element {
  const dispatch = useDispatch();

  const offers = useSelector((state: RootState) => state.offers.offers)
  const cityName = useSelector((state: RootState) => state.offers.city)

  const points = offers.map((offer) => offer.location);

  const cityOffers = useMemo(() => {
    return offers.filter((offer) => offer.city.name === cityName);
  }, [offers, cityName]);

  const currentCity = cityOffers[0]?.city;

  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const handleChangeCity = (cityName: string) => {
    dispatch(changeCity(cityName));
  }

  const handleListItemHover = (placeId: string) => {
    const currentOffer = cityOffers.find((offer) => offer.id === placeId);
    const currentPoint = points.find((point) =>
      point.lat === currentOffer?.location.lat &&
      point.lng === currentOffer?.location.lng
    );

    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  };

  const handleListItemBlur = () => {
    setSelectedPoint(undefined);
  };

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

              <PlacesSorting />

              <OffersList
                offers={cityOffers}
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
        </div>
      </main>
    </div>
  );
}
