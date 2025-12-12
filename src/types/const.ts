export enum AppRoute {
    Root = '/',
    Login ='/login',
    Offer = '/offers/:offerId',
    Favorites = '/favorites',
}

export enum AuthStatus {
    Auth = 'AUTH',
    NotAuth = 'NOT_AUTH',
    Unknown = 'UNKNOWN'
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export type SortingOptionsType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
export const SORTING_OPTIONS: SortingOptionsType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

