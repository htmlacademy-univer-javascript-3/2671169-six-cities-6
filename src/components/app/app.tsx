import { useDispatch } from 'react-redux';
import AppRouter from '../../router/router';
import { offers } from '../../mocks/offers';
import { useEffect } from 'react';
import { getFavorites, getOffers, getReviews } from '../../redux/slices/offers';
import { favorites } from '../../mocks/favorites';
import { reviews } from '../../mocks/reviews';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOffers(offers));
    dispatch(getFavorites(favorites));
    dispatch(getReviews(reviews));
  }, [dispatch]);

  return (
    <AppRouter />
  );
}
