import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HomePage } from './pages/HomePage';
import { ColumnsPage } from './pages/ColumnsPage';
import { ArchivesPage } from './pages/ArchivesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';

import { ZazenPage } from './pages/ZazenPage';
import { ZazenGuidePage } from './pages/ZazenGuidePage';
import { AudioController } from './components/AudioController';
import AboutPage from './pages/AboutPage';
import LuckyItemPage from './pages/LuckyItemPage';
import EmaHallPage from './pages/EmaHallPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

import AnimatedSignIn from './components/ui/AnimatedSignIn';

import { DashboardLayout } from './layouts/DashboardLayout';

import { SoundProvider } from './contexts/SoundContext';
import { ReloadPrompt } from './components/ReloadPrompt';
import { ScrollToTop } from './components/ui/ScrollToTop';

function App() {
    return (
        <SoundProvider>
            <Helmet>
                <title>Street Spirit | Digital Sanctuary & Omikuji</title>
                <meta name="description" content="Enter the Digital Sanctuary. A modern spiritual space to connect with the Universe, receive guidance, and manifest your destiny through the algorithm." />
            </Helmet>

            <div className="min-h-screen bg-shinto-white font-serif text-jap-indigo">
                <AudioController />
                <ReloadPrompt />
                <ScrollToTop />
                <Routes>
                    <Route element={<DashboardLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/lucky-item" element={<LuckyItemPage />} />
                        <Route path="/ema" element={<EmaHallPage />} />
                        <Route path="/columns" element={<ColumnsPage />} />
                        <Route path="/columns/:id" element={<ArticleDetailPage />} />
                        <Route path="/archives" element={<ArchivesPage />} />
                        <Route path="/zazen" element={<ZazenPage />} />
                        <Route path="/zazen/guide" element={<ZazenGuidePage />} />
                        <Route path="/login" element={<AnimatedSignIn />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsOfServicePage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Routes>
            </div>
        </SoundProvider>
    );
}

export default App;
