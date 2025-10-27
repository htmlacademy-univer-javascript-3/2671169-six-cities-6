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
    location: PointI
}

export type City = {
    name: string;
    location: {
        latitude: number,
        longitude: number,
        zoom: number;
    }
};

export interface PointI {
    title: string;
    lat: number;
    lng: number;
    zoom: number;
}

export interface OffersProps {
    offers: PlaceCardI[];
    city: City;
}
