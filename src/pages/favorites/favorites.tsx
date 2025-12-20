import { useAppSelector } from '../../hooks/redux';
import { PlaceCardI } from '../../types/offer';
import { AppRoute } from '../../const';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { OfferCardMemoized } from '../../hocs';

export interface FavoritesProps {
  offers: PlaceCardI[];
}

export default function Favorites() {
  const offers = useAppSelector((state) => state.offers.favorites);

  const groupOffersByCity = useMemo(() => {
    const res: Record<string, PlaceCardI[]> = {};

    offers.forEach((offer) => {
      const city = offer.city.name;

      if (res[city]) {
        res[city].push(offer);
      } else {
        res[city] = [offer];
      }
    });

    return res;
  }, [offers]);


  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(groupOffersByCity).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {groupOffersByCity[city].map((offer) => (
                      <OfferCardMemoized key={offer.id} offer={offer} cardClass='favorites' dataTestId='favorites-test'/>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
