import React from 'react';
import { motion } from 'framer-motion';

const ARTICLES = [
    {
        id: 1,
        title: "Today's Cosmic Alignment",
        subtitle: "今日の宇宙予報",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1000",
        excerpt: "The stars align to bring clarity to your digital chaos. Focus on cleaning your cache and your mind."
    },
    {
        id: 2,
        title: "Guide to Digital Worship",
        subtitle: "デジタル参拝の作法",
        image: "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?auto=format&fit=crop&q=80&w=1000",
        excerpt: "How to properly bow to your screen. A modern guide for the spiritual tech nomad."
    },
    {
        id: 3,
        title: "The Myth of Yaoyorozu",
        subtitle: "八百万の神々とは",
        image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Everything has a spirit. From your mechanical keyboard to the cloud server hosting your dreams."
    },
    {
        id: 4,
        title: "Power Spot: Cyber-Ise",
        subtitle: "電脳伊勢巡礼",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
        excerpt: "Visit the holiest sites in the digital realm. A travelogue for your avatar."
    }
];

export const ColumnSection: React.FC = () => {
    return (
        <section className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
                    Spiritual Insights
                </span>
                <h2 className="text-3xl md:text-5xl font-brush font-normal text-jap-indigo tracking-widest">
                    Spiritual Insights
                </h2>
                <div className="w-16 h-1 bg-jap-gold-300 mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {ARTICLES.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="group cursor-pointer"
                        onClick={() => alert("Coming Soon: Full Article Access")}
                    >
                        <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-sm bg-gray-100 shadow-md">
                            <div className="absolute inset-0 bg-jap-indigo/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                            />
                            {/* Vertical Text Overlay */}
                            <div className="absolute top-4 right-4 z-20 writing-vertical-rl text-white font-serif font-bold tracking-widest drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
                                {article.subtitle}
                            </div>
                        </div>

                        <div className="pr-4">
                            <h3 className="text-xl font-serif font-bold text-jap-indigo mb-3 group-hover:text-jap-vermilion transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-sans opacity-80 line-clamp-3">
                                {article.excerpt}
                            </p>
                            <div className="mt-4 text-xs font-bold text-jap-gold-500 uppercase tracking-widest flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                                Read More <span>→</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
