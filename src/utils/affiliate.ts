/**
 * Utility for Amazon Affiliate Integration
 */

export const getAmazonAffiliateTag = (): string => {
    return import.meta.env.VITE_AMAZON_ASSOCIATE_TAG || '';
};

export const getAmazonSearchUrl = (keyword: string): string => {
    const tag = getAmazonAffiliateTag();
    const baseUrl = 'https://www.amazon.com/s';

    // Create URL search params using 'k' for keyword and 'tag' for associate tag
    // Example: https://www.amazon.com/s?k=Daruma&tag=demo-22
    const params = new URLSearchParams();
    params.set('k', keyword);
    params.set('tag', tag);

    return `${baseUrl}?${params.toString()}`;
};
