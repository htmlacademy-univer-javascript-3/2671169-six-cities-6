export interface UserI {
    id: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
    email: string;
    token: string;
}

export interface UserPostData {
    email: string;
    password: string;
}
