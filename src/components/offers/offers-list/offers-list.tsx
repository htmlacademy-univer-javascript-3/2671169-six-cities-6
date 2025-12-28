import { useCallback } from 'react';
import { PlaceCardI } from '../../../types/offer';
import { OfferCardMemoized } from '../../../hocs/memo';

export interface OffersListProps {
  offers: PlaceCardI[];
  size?: boolean;
  cardClass: string;
  onListItemHover: (offer: PlaceCardI | undefined) => void;
  onListItemBlur: () => void;
}

export default function OffersList({ offers, size, cardClass, onListItemHover, onListItemBlur }: OffersListProps) {
  const handleHoverOffer = useCallback((offer: PlaceCardI) => {
    onListItemHover(offer);
  }, [onListItemHover]);

  const handleBlurOffer = useCallback(() => {
    onListItemBlur();
  }, [onListItemBlur]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCardMemoized
          key={offer.id}
          offer={offer}
          size={size}
          cardClass={cardClass}
          onMouseOver={handleHoverOffer}
          onMouseLeave={handleBlurOffer}
          dataTestId='offer-card'
        />
      ))}
    </div>
  );
}
