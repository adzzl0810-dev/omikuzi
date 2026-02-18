import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
    path?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
    title = "Street Spirit | Digital Sanctuary & Omikuji",
    description = "A cyberpunk-infused digital sanctuary. Draw Omikuji, practice Zazen, and collect Goshuin in a neo-traditional space.",
    image = "/pwa-512x512.png",
    type = "website",
    path
}) => {
    const location = useLocation();
    const currentUrl = `https://street-spirit.app${path || location.pathname}`;

    // Schema.org JSON-LD
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Street Spirit",
        "url": "https://street-spirit.app",
        "description": description,
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://street-spirit.app/?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`https://street-spirit.app${image}`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`https://street-spirit.app${image}`} />

            {/* Schema.org Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>
        </Helmet>
    );
};
