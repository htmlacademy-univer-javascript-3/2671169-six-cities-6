import { MouseEventHandler } from 'react';
import { PlaceCardI } from '../../types/offer-type';
import { Link } from 'react-router-dom';

interface PlaceCardProps {
  offer: PlaceCardI;
  size?: boolean;
  cardClass: string;
  onMouseOver?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
}

export default function OfferCard({ offer, size, cardClass, onMouseOver, onMouseLeave }: PlaceCardProps) {
  return (
    <article
      className={`${cardClass}__card place-card`}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={
          `${size ? 'cities__image-wrapper' : 'favorites__image-wrapper'}
          place-card__image-wrapper`
        }
      >
        <Link to={`/offers/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={size ? '260' : '150'}
            height={size ? '200' : '110'}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={
          `${size ? null : 'favorites__card-info'} 
          place-card__info`
        }
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={
              `place-card__bookmark-button
              ${offer.isFavorite ?
      'place-card__bookmark-button--active' : ''
    } button`
            }
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating * 20)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offers/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
