import { PlaceCardI } from '../types/offer-type';

export const favorites: PlaceCardI[] = [
  {
    id: 'place-4',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 8
      }
    },
    price: 180,
    isPremium: true,
    isFavorite: true,
    rating: 5,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    previewImage: 'img/apartment-03.jpg',
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    }
  },
  {
    id: 'place-2',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 8
      }
    },
    price: 80,
    isPremium: false,
    isFavorite: true,
    rating: 4,
    title: 'Wood and stone place',
    type: 'Room',
    previewImage: 'img/room.jpg',
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  },
  {
    id: 'place-6',
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    price: 180,
    isPremium: false,
    isFavorite: true,
    rating: 5,
    title: 'White castle',
    type: 'Apartment',
    previewImage: 'img/room.jpg',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
];
