import { useState } from 'react';
import MapComponent from '../../components/map-component/map-component';
import OffersList from '../../components/offers-list/offers-list';
import { OffersProps, PointI } from '../../types/offer-type';
import CitiesList from '../../components/cities-list/cities-list';

export default function MainPage({ offers, city }: OffersProps): JSX.Element {
  const points = offers.map((offer) => offer.location)

  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const handleListItemHover = (placeId: string) => {
    const currentOffer = offers.find((offer) => offer.id === placeId)
    const currentPoint = points.find((point) => point.title === currentOffer?.title);
    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  }

  const handleListItemBlur = () => {
    setSelectedPoint(undefined)
  }
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <OffersList
                offers={offers}
                size
                onListItemHover={handleListItemHover}
                onListItemBlur={handleListItemBlur}
              />

            </section>
            <div className="cities__right-section">
              <MapComponent city={city} points={points} selectedPoint={selectedPoint} mapClass="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
