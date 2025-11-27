import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getFavorites, getReviews } from '../../redux/slices/offers';
import { useEffect } from 'react';
import { favorites } from '../../mocks/favorites';
import { reviews } from '../../mocks/reviews';
import { Outlet } from 'react-router-dom';
import Spinner from '../../spinner/spinner';
import Header from '../header/header';

export default function Layout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFavorites(favorites));
    dispatch(getReviews(reviews));
  }, [dispatch]);

  const loading = useAppSelector((state) => state.offers.isLoading);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="layout">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
