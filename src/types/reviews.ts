import { UserI } from './user';

export interface ReviewI {
    id: string;
    date: string;
    user: UserI;
    comment: string;
    rating: 1 | 2 | 3 | 4 | 5;
}
