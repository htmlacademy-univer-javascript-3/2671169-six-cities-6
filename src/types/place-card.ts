export interface PlaceCardI {
    id: string;
    city: City;
    price: number;
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    title: string;
    type: string;
    image: string;
}

export interface City {
    name: string;
}

export interface AppProps {
    places: PlaceCardI[];
}
