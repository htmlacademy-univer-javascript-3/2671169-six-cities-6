import { PlaceCardI, PointI } from '../../types/offer-type';
import OfferCard from '../offer-card/offer-card';

interface OffersListProps {
  offers: PlaceCardI[];
  size?: boolean;
  cardClass: string;
  onListItemHover: (point: PointI | undefined) => void;
  onListItemBlur: (point: PointI | undefined) => void;
}

export default function OffersList({ offers, size, cardClass, onListItemHover, onListItemBlur }: OffersListProps) {
  const handleListItemHover = (offerId: string) => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    const currentPoint = currentOffer?.location;

    if (currentPoint) {
      onListItemHover(currentPoint);
    }
  };

  const handleListItemBlur = () => {
    onListItemBlur(undefined);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          size={size}
          cardClass={cardClass}
          onMouseOver={() => handleListItemHover(offer.id)}
          onMouseLeave={() => handleListItemBlur()}
        />
      ))}
    </div>
  );
}
