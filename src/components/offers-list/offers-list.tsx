import { PlaceCardI } from '../../types/offer-type';
import OfferCard from '../offer-card/offer-card';

interface OffersListProps {
  offers: PlaceCardI[];
  size?: boolean;
  onListItemHover: (placeId: string) => void
  onListItemBlur: () => void
}

export default function OffersList({ offers, size, onListItemHover, onListItemBlur }: OffersListProps) {
  const handleListItemHover = (offerId: string) => {
    onListItemHover(offerId)
  }

  const handleListItemBlur = () => {
    onListItemBlur();
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          size={size}
          onMouseOver={() => handleListItemHover(offer.id)}
          onMouseLeave={() => handleListItemBlur()}
        />
      ))}
    </div>
  );
}
