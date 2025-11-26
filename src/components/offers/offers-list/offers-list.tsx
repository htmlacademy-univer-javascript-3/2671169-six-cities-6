import { PlaceCardI } from '../../../types/offer-type';
import OfferCard from '../offer-card/offer-card';

interface OffersListProps {
  offers: PlaceCardI[];
  size?: boolean;
  cardClass: string;
  onListItemHover: (offer: PlaceCardI | undefined) => void;
  onListItemBlur: () => void;
}

export default function OffersList({ offers, size, cardClass, onListItemHover, onListItemBlur }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          size={size}
          cardClass={cardClass}
          onMouseOver={() => onListItemHover(offer)}
          onMouseLeave={() => onListItemBlur()}
        />
      ))}
    </div>
  );
}
