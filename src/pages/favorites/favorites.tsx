import { Link } from 'react-router-dom';
import { PlaceCardI } from '../../types/offer-type';
import OfferCard from '../../components/offer-card/offer-card';
import { useMemo } from 'react';

export interface FavoritesProps {
  offers: PlaceCardI[];
}

export default function Favorites({ offers }: FavoritesProps) {
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
                      <OfferCard key={offer.id} offer={offer}/>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
