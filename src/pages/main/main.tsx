import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useCallback, useEffect } from 'react';
import { changeCity } from '../../redux/slices/offers-slice';
import { getOffers } from '../../api/offers';
import CitiesContainer from '../../components/cities/cities-container/cities-container';
import Spinner from '../../components/spinner/spinner';
import CitiesList from '../../components/cities/cities-list/cities-list';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.offers.city);
  const isOffersLoading = useAppSelector((state) => state.offers.isOffersLoading);

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
              <CitiesList
                changeCity={handleChangeCity}
                currentCity={cityName}
              />
            </section>
          </div>
          <div className="cities">
            <CitiesContainer />
          </div>
        </main>
      )}
    </div>
  );
}
