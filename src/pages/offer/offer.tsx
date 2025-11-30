import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentOffer, getNearPlaces } from '../../api/offers';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PointI } from '../../types/offer-type';
import OfferCard from '../../components/offers/offer-card/offer-card';
import OfferBody from '../../components/offers/offer-body/offer-body';
import Spinner from '../../spinner/spinner';

export default function Offer(): JSX.Element {
  const dispatch = useAppDispatch();
  const nearPlaces = useAppSelector((state) => state.offers.nearPlaces);
  const currentOffer = useAppSelector((state) => state.offers.currentOffer);
  const isCurrentOfferLoading = useAppSelector((state) => state.offers.isCurrentOfferLoading);
  const isNearbyLoading = useAppSelector((state) => state.offers.isNearbyLoading);
  const { offerId } = useParams<{ offerId: string }>();

  useEffect(() => {
    if (offerId) {
      dispatch(getCurrentOffer(offerId));
      dispatch(getNearPlaces(offerId));
    }
  }, [offerId, dispatch]);

  const points = nearPlaces.map((place) => place.location);
  const [selectedPoint, setSelectedPoint] = useState<PointI | undefined>(undefined);

  const handleListItemHover = (placeId: string) => {
    const hoverOffer = nearPlaces.find((place) => place.id === placeId);
    const currentPoint = points.find((point) =>
      point.latitude === hoverOffer?.location.latitude
      && point.longitude === hoverOffer?.location.longitude
    );
    if (currentPoint) {
      setSelectedPoint(currentPoint);
    }
  };

  const handleListItemBlur = () => {
    setSelectedPoint(undefined);
  };

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
                  <OfferCard
                    key={place.id}
                    offer={place}
                    cardClass="near-places"
                    size
                    onMouseOver={() => handleListItemHover(place.id)}
                    onMouseLeave={() => handleListItemBlur()}
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
