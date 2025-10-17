import { useState } from 'react';
import { PlaceCardI } from '../../types/offer-type';
import OfferCard from '../offer-card/offer-card';

interface OffersListProps {
    offers: PlaceCardI[];
    size?: boolean;
}

export default function OffersList({ offers, size }: OffersListProps) {
  const [isActive, setIsActive] = useState<null | string>(null);

  // eslint-disable-next-line no-console
  console.log(isActive);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          size={size}
          onMouseOver={() => setIsActive(offer.id)}
          onMouseLeave={() => setIsActive(null)}
        />
      ))}
    </div>
  );
}
