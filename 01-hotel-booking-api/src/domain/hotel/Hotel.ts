export type UserType = 'regular' | 'premium';
export type DayType = 'weekday' | 'weekend';

export interface UserPricing {
    weekday: number;
    weekend: number;
}

export interface Hotel {
    id: string;
    name: string;
    stars: number;
    pricing: {
        regular: UserPricing,
        premium: UserPricing
    }
}

export interface QuoteResult {
    hotel: string;
    stars: number;
    totalPrice: number;
}