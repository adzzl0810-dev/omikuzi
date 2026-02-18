import { motion } from 'framer-motion';

export const AboutSection = () => {
    return (
        <section className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto text-center space-y-24">

            {/* Concept 1: MANIFESTATION */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <div className="absolute inset-0 bg-white/50 skew-y-1 blur-xl -z-10 rounded-3xl" />
                <div className="bg-shinto-paper border border-jap-gold-200 p-8 md:p-12 rounded-sm relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none text-jap-indigo">
                        <span className="text-9xl font-serif font-bold">命</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-jap-indigo mb-6 tracking-tight">
                        DIGITAL <span className="text-jap-vermilion">MANIFESTATION</span>
                    </h2>
                    <p className="text-lg md:text-xl text-jap-indigo/80 leading-relaxed max-w-3xl mx-auto font-serif">
                        <span className="font-bold text-jap-indigo">Omikuji (おみくじ)</span> is more than a fortune. It is a dialogue with the Universe.
                        <br />
                        By offering your worries to the digital void, you clarify your intent and manifest your path.
                        Receive guidance from the ancient Shinto spirits, reborn in the network.
                    </p>
                </div>
            </motion.div>

            {/* Concept 2: SPIRIT GUIDES */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group"
            >
                <div className="absolute inset-0 bg-white/50 -skew-y-1 blur-xl -z-10 rounded-3xl" />
                <div className="bg-shinto-paper border border-jap-gold-200 p-8 md:p-12 rounded-sm relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 left-0 p-4 opacity-10 pointer-events-none text-jap-indigo">
                        <span className="text-9xl font-serif font-bold">神</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-jap-indigo mb-6 tracking-tight">
                        YOUR <span className="text-jap-violet">SPIRIT GUIDES</span>
                    </h2>
                    <h3 className="text-xl md:text-sm font-sans font-bold text-jap-gold-500 mb-6 tracking-[0.3em] uppercase">
                        Yaoyorozu no Kami (8 Million Gods)
                    </h3>

                    <p className="text-lg md:text-xl text-jap-indigo/80 leading-relaxed max-w-3xl mx-auto font-serif">
                        In Shinto animism, everything has a spirit. Be it a tree, a rock, or a <span className="text-jap-violet font-bold">server</span>.
                        <br /><br />
                        Your energy summons a unique <span className="text-jap-indigo font-bold">Digital Deity</span> tailored to your vibration.
                        Collect these Spirit Cards to build your personal altar and amplify your luck.
                    </p>
                </div>
            </motion.div>

        </section>
    );
};
