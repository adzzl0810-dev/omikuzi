/**
 * Utility for Amazon Affiliate Integration
 */

export const getAmazonAffiliateTag = (): string => {
    return import.meta.env.VITE_AMAZON_ASSOCIATE_TAG || 'demo-22';
};

export const getAmazonSearchUrl = (keyword: string): string => {
    const tag = getAmazonAffiliateTag();
    const baseUrl = 'https://www.amazon.co.jp/s';

    // Create URL search params using 'k' for keyword and 'tag' for associate tag
    // Example: https://www.amazon.co.jp/s?k=Daruma&tag=demo-22
    const params = new URLSearchParams();
    params.set('k', keyword);
    params.set('tag', tag);

    return `${baseUrl}?${params.toString()}`;
};
