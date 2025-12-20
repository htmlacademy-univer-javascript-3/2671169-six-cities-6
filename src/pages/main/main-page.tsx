import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useCallback, useEffect } from 'react';
import { CitiesListMemoized } from '../../hocs';
import { changeCity } from '../../store/offers-data/offers-data';
import { getOffers } from '../../store/api-actions/offers';
import OffersContainer from '../../components/offers/offers-container/offers-container';
import OffersContainerEmpty from '../../components/offers/offers-container/offers-container-empty';
import Spinner from '../loading/spinner';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.offers.city);
  const { isOffersLoading } = useAppSelector((state) => state.offers);
  const { offers } = useAppSelector((state) => state.offers);

  useEffect(() => {
    dispatch(getOffers());
  }, [dispatch]);

  const handleChangeCity = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

  return (
    <div className="page page--gray page--main">
      {isOffersLoading ? (
        <Spinner />
      ) : (
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesListMemoized
                changeCity={handleChangeCity}
                currentCity={cityName}
              />
            </section>
          </div>
          <div className="cities">
            {offers ? (
              <OffersContainer />
            ) : (
              <OffersContainerEmpty city={cityName} />
            )}
          </div>
        </main>
      )}
    </div>
  );
}
