import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { SEOHead } from '../components/seo/SEOHead';

export const ArticleDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const article = ARTICLES.find(a => a.id === Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-shinto-white text-jap-indigo">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <button
                        onClick={() => navigate('/columns')}
                        className="text-jap-vermilion hover:underline"
                    >
                        Return to Columns
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo">
            <SEOHead
                title={`${article.title} | Street Spirit Columns`}
                description={article.excerpt}
                image={article.image}
                type="article"
                path={`/columns/${article.id}`}
            />

            {/* Hero Image */}
            <div className="h-[60vh] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 border border-white/50 rounded-full text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                            {article.subtitle}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 max-w-4xl leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center justify-center gap-6 text-sm font-sans opacity-80">
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag size={16} />
                                <span>{article.tags.join(', ')}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-3xl mx-auto px-6 py-16 -mt-20 relative z-30">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="bg-white/90 backdrop-blur-md p-8 md:p-12 shadow-2xl rounded-sm border border-gray-100"
                >
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/columns')}
                        className="group flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 hover:text-jap-vermilion mb-12 transition-colors uppercase"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Columns
                    </button>

                    {/* Article Body */}
                    <div
                        className="prose prose-lg prose-indigo max-w-none font-serif leading-loose text-gray-700"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Footer / Share (Mock) */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-brush text-2xl text-jap-indigo">Street Spirit</span>
                        <div className="text-sm text-gray-400">Share this wisdom</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
