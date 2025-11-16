import { PlaceCardI } from '../types/offer-type';

export const nearPlaces: PlaceCardI[] = [
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
      lat: 52.3609553943508,
      lng: 4.85309666406198,
      zoom: 8
    }
  },
  {
    id: 'place-3',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 8
      }
    },
    price: 132,
    isPremium: false,
    isFavorite: false,
    rating: 4,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    previewImage: 'img/apartment-02.jpg',
    location: {
      lat: 52.3909553943508,
      lng: 4.929309666406198,
      zoom: 8
    }
  },
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
      lat: 52.3809553943508,
      lng: 4.939309666406198,
      zoom: 8
    }
  },
];
