import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { BackgroundCircles } from '../components/ui/background-circles';
import { KikyoLoader } from '../components/KikyoLoader';
import { GoshuinCho } from '../components/GoshuinCho';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { AchievementsView } from '../components/dashboard/AchievementsView';

interface Reading {
    id: string;
    fortune_level: string;
    god_name: string;
    god_image_url: string | null;
    created_at: string;
    input_text: string;
}

interface ZazenSession {
    id: string;
    course_id: string;
    duration_seconds: number;
    completed_at: string;
}

export const ArchivesPage: React.FC = () => {
    const { user, signOut } = useAuth();
    const [readings, setReadings] = useState<Reading[]>([]);
    const [sessions, setSessions] = useState<ZazenSession[]>([]);
    const [userProfile, setUserProfile] = useState<{ streak_days?: number } | null>(null);
    const [goshuinCount, setGoshuinCount] = useState(0);
    const [activeTab, setActiveTab] = useState<'readings' | 'zazen' | 'goshuin' | 'achievements'>('readings');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            // Fetch User Profile (for streak)
            const { data: profileData } = await supabase
                .from('users')
                .select('streak_days')
                .eq('id', user.id)
                .single();

            if (profileData) setUserProfile(profileData);

            // Fetch Readings
            const { data: readingsData } = await supabase
                .from('readings')
                .select('id, fortune_level, god_name, god_image_url, created_at, input_text')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (readingsData) setReadings(readingsData);

            // Fetch Zazen Sessions
            const { data: zazenData } = await supabase
                .from('zazen_sessions')
                .select('*')
                .eq('user_id', user.id)
                .order('completed_at', { ascending: false });

            if (zazenData) setSessions(zazenData as any);

            // Fetch Goshuin Count
            const { count } = await supabase
                .from('goshuin_entries')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id);

            if (count !== null) setGoshuinCount(count);

            setLoading(false);
        };

        fetchData();
    }, [user]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    // Stats Calculation
    const stats = {
        totalReadings: readings.length,
        totalZazenMinutes: Math.floor(sessions.reduce((acc, curr) => acc + curr.duration_seconds, 0) / 60),
        streakDays: userProfile?.streak_days || 0,
        goshuinCount: goshuinCount
    };

    return (
        <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo relative">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 fixed">
                <BackgroundCircles variant="primary" />
            </div>

            {/* Dashboard Header */}
            {user && (
                <DashboardHeader user={user} stats={stats} onSignOut={handleSignOut} />
            )}

            <div className="relative z-10 pt-8 px-4 pb-12 max-w-7xl mx-auto flex flex-col items-center">

                {!user && (
                    <div className="pt-24 text-center mb-8">
                        <span className="text-jap-vermilion font-bold tracking-[0.3em] uppercase text-xs mb-2 block">
                            YOUR SPIRITUAL JOURNEY
                        </span>
                        <h1 className="text-4xl md:text-6xl font-brush font-normal text-jap-indigo tracking-widest">
                            My Archives
                        </h1>
                        <div className="w-16 h-1 bg-jap-gold-300 mx-auto mt-6"></div>
                    </div>
                )}

                {/* Tab Navigation */}
                {user && (
                    <div className="flex gap-8 mb-12 border-b border-gray-200 px-8 w-full justify-center">
                        <button
                            onClick={() => setActiveTab('readings')}
                            className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'readings' ? 'text-jap-indigo' : 'text-gray-400 hover:text-jap-gold-400'
                                }`}
                        >
                            Oracles
                            {activeTab === 'readings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jap-vermilion"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab('zazen')}
                            className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'zazen' ? 'text-jap-indigo' : 'text-gray-400 hover:text-jap-gold-400'
                                }`}
                        >
                            Mindfulness
                            {activeTab === 'zazen' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jap-vermilion"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab('goshuin')}
                            className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'goshuin' ? 'text-jap-indigo' : 'text-gray-400 hover:text-jap-gold-400'
                                }`}
                        >
                            Goshuin
                            {activeTab === 'goshuin' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jap-vermilion"></div>}
                        </button>
                        <button
                            onClick={() => setActiveTab('achievements')}
                            className={`pb-4 px-2 text-sm font-bold tracking-widest uppercase transition-all relative ${activeTab === 'achievements' ? 'text-jap-indigo' : 'text-gray-400 hover:text-jap-gold-400'
                                }`}
                        >
                            Achievements
                            {activeTab === 'achievements' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-jap-vermilion"></div>}
                        </button>
                    </div>
                )}

                {/* Content */}
                {!user ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-sm border border-jap-gold-300 rounded-sm shadow-xl max-w-md text-center mt-12">
                        <div className="text-6xl mb-6">🔐</div>
                        <h2 className="text-2xl font-serif font-bold text-jap-indigo mb-4">Connect Spirit</h2>
                        <p className="text-gray-500 mb-8 font-serif">
                            Sign in to access your past readings and sync your spiritual journey across devices.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-3 bg-jap-vermilion text-white font-bold tracking-widest hover:bg-jap-indigo transition-colors shadow-lg"
                        >
                            SIGN IN / REGISTER
                        </button>
                    </div>
                ) : loading ? (
                    <div className="mt-20">
                        <KikyoLoader />
                    </div>
                ) : activeTab === 'achievements' ? (
                    <AchievementsView stats={{
                        readingsCount: stats.totalReadings,
                        zazenMinutes: stats.totalZazenMinutes,
                        streakDays: stats.streakDays,
                        goshuinCount: stats.goshuinCount
                    }} />
                ) : activeTab === 'readings' ? (
                    /* Readings Tab Content */
                    readings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center opacity-50 space-y-4">
                            <div className="text-6xl grayscale">🕸️</div>
                            <div className="font-serif text-gray-500">
                                The pages are empty.<br />
                                (まだ記録はありません)
                            </div>
                            <button
                                onClick={() => navigate('/')}
                                className="mt-6 px-8 py-3 bg-jap-indigo text-white font-bold tracking-widest hover:bg-jap-vermilion transition-colors shadow-lg rounded-sm"
                            >
                                RECEIVE FIRST ORACLE
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                            {readings.map((reading) => (
                                <div key={reading.id} className="relative group perspective-1000">
                                    <div className="relative bg-white border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 rounded-sm">
                                        {/* Date Stamp */}
                                        <div className="absolute -top-3 -right-3 w-12 h-12 bg-jap-vermilion rounded-full flex items-center justify-center text-[10px] text-white font-bold font-sans shadow-md z-10 rotate-12">
                                            {new Date(reading.created_at).getDate()}
                                        </div>

                                        {/* Image Area */}
                                        <div className="aspect-[3/4] overflow-hidden mb-6 bg-gray-100 relative grayscale group-hover:grayscale-0 transition-all duration-700 shadow-inner">
                                            {reading.god_image_url ? (
                                                <img
                                                    src={reading.god_image_url}
                                                    alt={reading.god_name}
                                                    className="w-full h-full object-cover mix-blend-multiply"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 font-serif p-4 text-center">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Text Info */}
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold font-serif text-jap-indigo mb-2">{reading.god_name}</h3>
                                            <div className="text-xs font-sans text-jap-vermilion uppercase tracking-widest mb-4 border-t border-b border-gray-100 py-1 inline-block">
                                                {reading.fortune_level}
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-3 font-serif italic leading-relaxed">"{reading.input_text}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : activeTab === 'zazen' ? (
                    /* Zazen Tab Content */
                    <div className="w-full max-w-4xl">
                        {/* Zazen Header with Quote */}
                        <div className="text-center mb-12 opacity-80">
                            <p className="font-serif italic text-xl">
                                "In zazen, leave your front door and your back door open.<br />
                                Let thoughts come and go. Just don't serve them tea."
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest mt-4 text-gray-400">— Shunryu Suzuki</p>
                        </div>

                        {/* Session List */}
                        {sessions.length === 0 ? (
                            <div className="text-center py-12 opacity-60">
                                <p className="font-serif text-gray-500 mb-4">No meditation sessions recorded yet.</p>
                                <button
                                    onClick={() => navigate('/zazen')}
                                    className="px-6 py-2 bg-jap-gold-300 text-white text-sm font-bold tracking-widest hover:bg-jap-indigo transition-colors"
                                >
                                    START ZAZEN
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Course</th>
                                            <th className="px-6 py-4">Duration</th>
                                            <th className="px-6 py-4 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {sessions.map((session) => (
                                            <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-sm text-gray-600">
                                                    {new Date(session.completed_at).toLocaleDateString()} <span className="text-gray-400 text-xs ml-2">{new Date(session.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-serif text-jap-indigo capitalize">
                                                    {session.course_id}
                                                </td>
                                                <td className="px-6 py-4 text-sm font-mono text-gray-600">
                                                    {Math.floor(session.duration_seconds / 60)} min
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold tracking-wider uppercase rounded-full">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Goshuin Tab Content */
                    <div className="w-full">
                        <GoshuinCho />
                    </div>
                )}
            </div>
        </div>
    );
};
