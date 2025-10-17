export enum AppRoute {
    Root = '/',
    Login ='/login',
    Main = '/main',
    Offer = '/offer/:offerId',
    Favorites = '/favorites',
}

export enum AuthStatus {
    Auth = 'AUTH',
    NotAuth = 'NOT_AUTH',
    Unknown = 'UNKNOWN'
}
