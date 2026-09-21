export type UserType = 'regular' | 'premium';
export type DayType = 'weekday' | 'weekend';
export const VALID_USER_TYPES: UserType[] = ['regular', 'premium'];

export function isValidUserType(value: unknown): value is UserType {
    return typeof value === 'string' && VALID_USER_TYPES.includes(value as UserType);
}

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