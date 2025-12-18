import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentOffer, getNearPlaces } from '../../store/api-actions/offers';
import { PlaceCardI, PointI } from '../../types/offer';
import { OfferCardMemoized } from '../../hocs';
import { useParams } from 'react-router-dom';
import OfferBody from '../../components/offers/offer-body/offer-body';
import Spinner from '../../components/spinner/spinner';

export default function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const { nearPlaces } = useAppSelector((state) => state.offers);
  const { currentOffer } = useAppSelector((state) => state.offers);
  const { isCurrentOfferLoading } = useAppSelector((state) => state.offers);
  const { isNearbyLoading } = useAppSelector((state) => state.offers);
  const { offerId } = useParams<{ offerId: string }>();

  useEffect(() => {
    if (offerId) {
      dispatch(getCurrentOffer(offerId));
      dispatch(getNearPlaces(offerId));
    }
  }, [offerId, dispatch]);

  const points = nearPlaces.map((place) => place.location);
  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const handleListItemHover = useCallback((offer: PlaceCardI) => {
    const currentPoint = offer?.location;
    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  }, []);

  const handleListItemBlur = useCallback(() => {
    setSelectedPoint(undefined);
  }, []);

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        {offerId && !isCurrentOfferLoading && currentOffer ? (
          <OfferBody
            points={points}
            selectedPoint={selectedPoint}
            currentOffer={currentOffer}
            offerId={offerId}
          />
        ) : (
          <Spinner />
        )}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {isNearbyLoading ? (
              <Spinner />
            ) : (
              <div className="near-places__list places__list">
                {nearPlaces.map((place) => (
                  <OfferCardMemoized
                    key={place.id}
                    offer={place}
                    cardClass="near-places"
                    size
                    onMouseOver={handleListItemHover}
                    onMouseLeave={handleListItemBlur}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
