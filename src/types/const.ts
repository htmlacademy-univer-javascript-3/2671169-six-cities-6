export enum AppRoute {
    Root = '/',
    Login ='/login',
    Main = '/main',
    Offer = '/offers/:offerId',
    Favorites = '/favorites',
}

export enum AuthStatus {
    Auth = 'AUTH',
    NotAuth = 'NOT_AUTH',
    Unknown = 'UNKNOWN'
}
