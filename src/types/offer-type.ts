export interface PlaceCardI {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: PointI;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
}

export type Location = {
    latitude: number;
    longitude: number;
    zoom: number;
}

export type City = {
    name: string;
    location: Location;
};

export interface PointI {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface OfferI extends PlaceCardI {
    description: string;
    bedrooms: number;
    goods: string[];
    host: HostI;
    images: string[];
    maxAdults: number;
}

export interface HostI {
    id: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
}
