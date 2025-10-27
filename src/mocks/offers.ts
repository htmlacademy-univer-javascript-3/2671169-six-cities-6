import { PlaceCardI } from '../types/offer-type';

export const offers: PlaceCardI[] = [
  {
    id: 'place-1',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 8
      }
    },
    price: 120,
    isPremium: true,
    isFavorite: false,
    rating: 4,
    title: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    previewImage: 'img/apartment-01.jpg',
    location: {
      title: 'Beautiful &amp; luxurious apartment at great location',
      lat: 52.3909553943508,
      lng: 4.85309666406198,
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
      title: 'Wood and stone place',
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
      title: 'Canal View Prinsengracht',
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
      title: 'Nice, cozy, warm big bed apartment',
      lat: 52.3809553943508,
      lng: 4.939309666406198,
      zoom: 8
    }
  },
  {
    id: 'place-5',
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
      title: 'Wood and stone place',
      lat: 52.3609553943508,
      lng: 4.85309666406198,
      zoom: 8
    }
  },
];
