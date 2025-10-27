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
}

export interface City {
    name: string;
}

export interface OffersProps {
    offers: PlaceCardI[];
}
