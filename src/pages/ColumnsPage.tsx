import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ARTICLES } from '../data/articles';

export const ColumnsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo">

            <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-2 block animate-pulse">
                        WISDOM OF THE NETWORK
                    </span>
                    <h1 className="text-4xl md:text-6xl font-brush font-normal text-jap-indigo tracking-widest mb-6">
                        Spiritual Insights
                    </h1>
                    <div className="w-24 h-1 bg-jap-gold-300 mx-auto"></div>
                    <p className="mt-8 text-gray-500 font-serif tracking-widest">
                        Deep dive into the intersection of technology and spirituality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {ARTICLES.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer bg-white shadow-sm hover:shadow-2xl transition-all duration-500 rounded-sm overflow-hidden border border-gray-100"
                            onClick={() => navigate(`/columns/${article.id}`)}
                        >
                            <div className="relative overflow-hidden aspect-[16/10]">
                                <div className="absolute inset-0 bg-jap-indigo/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-widest text-jap-indigo uppercase">
                                    COLUMN {article.id}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="text-xs text-jap-gold-500 font-bold tracking-widest mb-3 uppercase">
                                    {article.subtitle}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-jap-indigo mb-4 group-hover:text-jap-vermilion transition-colors leading-tight">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed font-sans opacity-80 line-clamp-3 mb-6">
                                    {article.excerpt}
                                </p>
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-jap-indigo uppercase tracking-widest group-hover:gap-4 transition-all">
                                    Read Article <span className="text-jap-vermilion">→</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
