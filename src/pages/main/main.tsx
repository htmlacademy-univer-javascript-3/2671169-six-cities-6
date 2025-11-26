import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useCallback } from 'react';
import { changeCity } from '../../redux/slices/offers';
import CitiesContainer from '../../components/cities/cities-container/cities-container';
import CitiesList from '../../components/cities/cities-list/cities-list';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const cityName = useAppSelector((state) => state.offers.city);

  const handleChangeCity = useCallback((city: string) => {
    dispatch(changeCity(city));
  }, [dispatch]);

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
          <CitiesContainer />
        </div>
      </main>
    </div>
  );
}
