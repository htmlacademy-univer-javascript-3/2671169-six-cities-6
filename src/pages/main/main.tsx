import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useCallback, useEffect } from 'react';
import { CitiesListMemoized } from '../../hocs';
import { changeCity } from '../../store/slices/offers-slice';
import { getOffers } from '../../store/api-actions/offers';
import CitiesContainer from '../../components/cities/cities-container/cities-container';
import CitiesContainerEmpty from '../../components/cities/cities-container/cities-container-empty';
import Spinner from '../../components/spinner/spinner';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.offers.city);
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);
  const cities = useAppSelector((state) => state.offers.offers);

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
            {cities ? (
              <CitiesContainer />
            ) : (
              <CitiesContainerEmpty city={cityName} />
            )}
          </div>
        </main>
      )}
    </div>
  );
}
