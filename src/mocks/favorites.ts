import { PlaceCardI } from '../types/offer-type';

export const favorites: PlaceCardI[] = [
  {
    id: 'place-4',
    city: {
      name: 'Amsterdam',
    },
    price: 180,
    isPremium: true,
    isFavorite: true,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: 'img/apartment-03.jpg',
  },
  {
    id: 'place-2',
    city: {
      name: 'Amsterdam',
    },
    price: 80,
    isPremium: false,
    isFavorite: true,
    rating: 4,
    title: 'Wood and stone place',
    type: 'Room',
    previewImage: 'img/room.jpg',
  },
  {
    id: 'place-6',
    city: {
      name: 'Cologne',
    },
    price: 180,
    isPremium: false,
    isFavorite: true,
    rating: 5,
    title: 'White castle',
    type: 'Apartment',
    previewImage: 'img/room.jpg',
  },
];
