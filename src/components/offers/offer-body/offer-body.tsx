import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { MapComponentMemoized, ReviewsListMemoized } from '../../../hocs/memo';
import { changeFavoriteStatus } from '../../../store/api-actions/favorite';
import { getReviewsList } from '../../../store/api-actions/review';
import { OfferI, PointI } from '../../../types/offer';
import { useNavigate } from 'react-router-dom';
import { AuthStatus } from '../../../const';
import { useEffect } from 'react';
import Spinner from '../../../pages/loading/spinner';

interface OfferBodyProps {
  points: PointI[];
  selectedPoint: PointI | undefined;
  currentOffer: OfferI;
}

export default function OfferBody({ points, selectedPoint, currentOffer }: OfferBodyProps) {
  const dispatch = useAppDispatch();
  const { isReviewsLoading } = useAppSelector((state) => state.reviews);
  const { authorizationStatus } = useAppSelector((state) => state.user);
  const city = currentOffer?.city;

  const navigator = useNavigate();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(getReviewsList(currentOffer.id));
    }

    return () => {
      isMounted = false;
    };
  }, [currentOffer.id, dispatch]);

  const handleChangeFavorite = () => {
    if (authorizationStatus !== AuthStatus.Auth) {
      navigator('/login');
    }

    if (currentOffer.isFavorite) {
      dispatch(changeFavoriteStatus({ offerId: currentOffer.id, status: 0 }));
    } else {
      dispatch(changeFavoriteStatus({ offerId: currentOffer.id, status: 1 }));
    }
  };

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {currentOffer?.images.map((img) => (
            <div key={img} className="offer__image-wrapper">
              <img className="offer__image" src={img} alt="Photo studio" />
            </div>
          ))}
        </div>
      </div>
      <div className="offer__container container">
        <div className="offer__wrapper">
          {currentOffer?.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="offer__name-wrapper">
            <h1 className="offer__name">
              {currentOffer?.title}
            </h1>
            <button
              className={
                `offer__bookmark-button
              ${currentOffer.isFavorite ?
      'offer__bookmark-button--active' : ''
    } button`
              }
              type="button"
              onClick={handleChangeFavorite}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: `${(currentOffer.rating * 20)}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
          </div>
          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {currentOffer?.type.charAt(0).toUpperCase()}{currentOffer?.type.slice(1)}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {currentOffer?.bedrooms} Bedrooms
            </li>
            <li className="offer__feature offer__feature--adults">
              Max {currentOffer?.maxAdults} adults
            </li>
          </ul>
          <div className="offer__price">
            <b className="offer__price-value">&euro;{currentOffer?.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>
          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {currentOffer?.goods.map((good) => (
                <li key={good} className="offer__inside-item">
                  {good}
                </li>
              ))}
            </ul>
          </div>
          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>
            <div className="offer__host-user user">
              <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                <img className="offer__avatar user__avatar" src={currentOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
              </div>
              <span className="offer__user-name">
                {currentOffer?.host.name}
              </span>
              {currentOffer?.host.isPro && (
                <span className="offer__user-status">
                  Pro
                </span>
              )}
            </div>
            <div className="offer__description">
              <p className="offer__text">
                {currentOffer?.description}
              </p>
            </div>
          </div>
          {isReviewsLoading ? (
            <Spinner />
          ) : (
            <ReviewsListMemoized offerId={currentOffer.id} />
          )}
        </div>
      </div>
      {city && (
        <MapComponentMemoized
          city={city}
          points={points}
          selectedPoint={selectedPoint}
          mapClass="offer__map"
        />
      )}
    </section>
  );
}
