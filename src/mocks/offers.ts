import { PlaceCardI } from '../types/offer-type';

export const offers: PlaceCardI[] = [
  {
    id: 'place-1',
    city: {
      name: 'Amsterdam',
    },
    price: 120,
    isPremium: true,
    isFavorite: false,
    rating: 4,
    title: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    previewImage: 'img/apartment-01.jpg',

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
    id: 'place-3',
    city: {
      name: 'Amsterdam',
    },
    price: 132,
    isPremium: false,
    isFavorite: false,
    rating: 4,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: 'img/apartment-02.jpg',
  },
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
    id: 'place-5',
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
];


