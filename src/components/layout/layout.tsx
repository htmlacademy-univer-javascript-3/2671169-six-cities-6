import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getFavorites, getReviews } from '../../redux/slices/offers';
import { getOffers } from '../../api';
import { useEffect } from 'react';
import { favorites } from '../../mocks/favorites';
import { reviews } from '../../mocks/reviews';
import { Outlet } from 'react-router-dom';
import Spinner from '../../spinner/spinner';
import Header from '../header/header';

export default function Layout() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.offers.isLoading);
  useEffect(() => {
    dispatch(getFavorites(favorites));
    dispatch(getReviews(reviews));
    dispatch(getOffers());
  }, [dispatch]);

  return (
    <div className="layout">
      <Header />
      <main className="main">
        {loading ? (
          <Spinner />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
