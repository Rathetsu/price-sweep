export type Product = {
    _id?: string;
    users?: User[];
    url: string;
    currency: string;
    mainImage: string;
    images: string[];
    title: string;
    description: string;
    category: string;
    reviewsCount: number;
    rating: number;
    isOutOfStock: Boolean;
    currentPrice: number;
    originalPrice: number;
    isRange: Boolean;
    priceRangeStart: number | null;
    priceRangeEnd: number | null;
    discountRate: number;
    priceHistory: PriceHistoryItem[] | [];
    highestPrice: number;
    lowestPrice: number;
    averagePrice: number;
};
