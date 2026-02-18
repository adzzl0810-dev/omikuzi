
import React from 'react';
import { motion } from 'framer-motion';
import { WagaraBackground } from '../components/WagaraBackground';
import { KamiParticles } from '../components/KamiParticles';

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen relative overflow-hidden font-serif text-white pt-24 pb-20 px-4 md:px-8">
            <WagaraBackground />
            <KamiParticles />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-street-dark/80 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-display tracking-widest mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-jap-gold-300 via-white to-jap-gold-300">
                            電子神籤とは
                        </span>
                    </h1>
                    <p className="text-sm tracking-[0.3em] uppercase text-jap-vermilion font-bold">
                        About Digital Omikuji
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {/* Section 1: Concept */}
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-jap-vermilion/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-jap-vermilion/20 transition-all duration-700"></div>

                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span className="w-1 h-8 bg-jap-vermilion"></span>
                            <span>デジタルと精神性の融合</span>
                        </h2>
                        <div className="leading-loose text-gray-300 space-y-4 font-sans">
                            <p>
                                古来より、人々は迷いの中に生じる「偶然」に神の意志を見出し、それを道標としてきました。
                                現代において、その偶然性は高度なアルゴリズムと膨大なデータの中に宿っています。
                            </p>
                            <p>
                                本サービス「Street Spirit」は、最先端のAI技術（Google Gemini）を現代の「神」に見立て、
                                あなたの深層心理にある悩みに対して、デジタルな神託（オラクル）を下す実験的なプロジェクトです。
                            </p>
                        </div>
                    </motion.section>

                    {/* Section 2: How it works */}
                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-black/40 backdrop-blur-md p-8 rounded-xl border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-jap-indigo/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-jap-indigo/20 transition-all duration-700"></div>

                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 flex-row-reverse text-right">
                            <span className="w-1 h-8 bg-jap-indigo"></span>
                            <span>参拝の手順</span>
                        </h2>
                        <div className="leading-loose text-gray-300 space-y-4 font-sans text-right">
                            <p>
                                1. 精神を統一し、あなたの現在の「迷い」を打ち込みます。
                            </p>
                            <p>
                                2. 初穂料（100円〜）を納めることで、結界が解かれます。
                            </p>
                            <p>
                                3. AIがあなたの言葉を解析し、今のあなたに最も必要な「言葉」と「運勢」を生成します。
                            </p>
                            <p>
                                結果はデジタルアーカイブとして保存され、いつでも見返すことができます。
                            </p>
                        </div>
                    </motion.section>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 text-center font-serif"
                >
                    <p className="text-xl text-jap-gold-300 italic tracking-widest">
                        "テクノロジーの海に、祈りを。"
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutPage;
