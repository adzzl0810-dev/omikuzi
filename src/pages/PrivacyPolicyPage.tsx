import React, { useEffect } from 'react';
import { BackgroundCircles } from '../components/ui/background-circles';
import { SEOHead } from '../components/seo/SEOHead';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const lastUpdated = "February 20, 2026";

    return (
        <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo relative">
            <SEOHead
                title="Privacy Policy | Street Spirit"
                description="Our privacy policy regarding data collection, AI processing, and user data rights."
                path="/privacy"
            />
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 fixed">
                <BackgroundCircles variant="primary" />
            </div>

            <div className="relative z-10 pt-24 px-4 pb-12 max-w-3xl mx-auto flex flex-col items-center">
                <div className="text-center mb-12">
                    <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
                        LEGAL COMPLIANCE
                    </span>
                    <h1 className="text-4xl md:text-5xl font-brush font-normal text-jap-indigo tracking-widest">
                        Privacy Policy
                    </h1>
                    <div className="text-xs text-gray-500 mt-4 tracking-widest uppercase">
                        Last Updated: {lastUpdated}
                    </div>
                    <div className="w-16 h-1 bg-jap-gold-300 mx-auto mt-6"></div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 p-8 md:p-12 shadow-xl rounded-sm w-full prose prose-stone max-w-none">
                    <p className="lead text-lg mb-8 italic text-gray-600 border-l-4 border-jap-gold-300 pl-4">
                        Street Spirit ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                    </p>

                    <h2 className="text-xl font-bold text-jap-indigo mt-8 mb-4 border-b border-gray-200 pb-2">1. Data We Collect</h2>
                    <p className="mb-4">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li><strong>Identity Data:</strong> includes first name, last name, and profile picture (if authenticated via Google).</li>
                        <li><strong>Contact Data:</strong> includes email address.</li>
                        <li><strong>Transaction Data:</strong> includes details about payments (processed securely via Stripe) and records of digital items acquired.</li>
                        <li><strong>Interaction Data:</strong> includes the text inputs ("worries" or "wishes") you submit to receive Oracles (Omikuji).</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-jap-indigo mt-8 mb-4 border-b border-gray-200 pb-2">2. How We Use Your Data (Including AI Processing)</h2>
                    <p className="mb-4">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li>To provide the core "Omikuji" service. <strong>Important Note regarding AI:</strong> The text inputs you submit are securely transmitted to third-party artificial intelligence providers (specifically, Google Gemini API) solely for the purpose of generating your personalized spiritual advice. We do not use your personal inputs to train our own models, and we require our AI partners to adhere to strict confidentiality standards.</li>
                        <li>To manage your account and synchronize your data across devices (if you choose to sign in).</li>
                        <li>To process your payments (via our payment processor, Stripe). We do not store your credit card information on our servers.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-jap-indigo mt-8 mb-4 border-b border-gray-200 pb-2">3. Data Retention and The "Purify" (Cremation) Feature</h2>
                    <p className="mb-4">We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for. Specifically:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li><strong>Archived Readings:</strong> Your past Omikuji readings are stored in our secure database (Supabase) so you can review them in your Archives.</li>
                        <li><strong>The "PURIFY" Feature:</strong> We provide a feature that allows you to permanently delete ("Cremate") any past oracle record. Clicking this button physically and permanently removes that specific record (including the text you submitted and the AI's response) from our active database. This cannot be undone.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-jap-indigo mt-8 mb-4 border-b border-gray-200 pb-2">4. Third-Party Services</h2>
                    <p className="mb-4">Our application utilizes several third-party services to function effectively. By using our service, you acknowledge that your data may be processed by:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li><strong>Vercel:</strong> For website hosting.</li>
                        <li><strong>Supabase:</strong> For database and authentication services.</li>
                        <li><strong>Stripe:</strong> For secure payment processing.</li>
                        <li><strong>Google (Gemini API / OAuth):</strong> For Artificial Intelligence processing and authentication.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-jap-indigo mt-8 mb-4 border-b border-gray-200 pb-2">5. Your Legal Rights (CCPA / GDPR)</h2>
                    <p className="mb-4">Depending on your location, you may have rights under data protection laws in relation to your personal data, including the right to:</p>
                    <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                        <li>Request access to your personal data.</li>
                        <li>Request correction of your personal data.</li>
                        <li>Request erasure of your personal data (Right to be Forgotten). You can exercise this via the "Purify" feature or by deleting your account.</li>
                        <li>Object to processing of your personal data.</li>
                        <li>Request restriction of processing your personal data.</li>
                        <li>Request transfer of your personal data.</li>
                        <li>Right to withdraw consent.</li>
                    </ul>
                    <p className="mb-4">
                        If you wish to exercise any of the rights set out above, please contact us. Note that as an alpha product, some automated data export features may not yet be available, but we will manually assist you upon request.
                    </p>

                    <h2 className="text-xl font-bold text-jap-indigo mt-8 mb-4 border-b border-gray-200 pb-2">6. Contact</h2>
                    <p className="mb-6 text-gray-700">
                        For any privacy-related questions, please reach out to the developer via the associated social media channels or GitHub repository linked in the application.
                    </p>

                    <div className="mt-12 text-center">
                        <Link to="/" className="inline-block px-8 py-3 bg-jap-indigo text-white font-bold tracking-widest hover:bg-jap-vermilion transition-colors shadow-lg rounded-sm text-sm">
                            RETURN TO SHRINE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
