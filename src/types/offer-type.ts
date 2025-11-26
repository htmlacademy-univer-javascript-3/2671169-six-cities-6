export interface PlaceCardI {
    id: string;
    city: City;
    price: number;
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    title: string;
    type: string;
    previewImage: string;
    location: PointI;
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
