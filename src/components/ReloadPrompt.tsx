import { useState, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

export const ReloadPrompt = () => {
    const [offlineReady, setOfflineReady] = useState(false);
    const [needRefresh, setNeedRefresh] = useState(false);
    const [updateSW, setUpdateSW] = useState<() => Promise<void> | undefined>();

    useEffect(() => {
        const updateServiceWorker = registerSW({
            onNeedRefresh() {
                setNeedRefresh(true);
            },
            onOfflineReady() {
                setOfflineReady(true);
            },
            onRegisterError(error) {
                console.log('SW registration error', error);
            },
        });
        setUpdateSW(() => updateServiceWorker);
    }, []);

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    return (
        <div className="ReloadPrompt-container">
            {(offlineReady || needRefresh) && (
                <div className="fixed bottom-0 right-0 m-4 p-4 bg-jap-indigo text-white rounded-sm shadow-lg border border-jap-gold-300 z-50 flex flex-col gap-2 max-w-sm font-sans">
                    <div className="text-sm font-bold">
                        {offlineReady
                            ? 'App ready to work offline'
                            : 'New content available, click on reload button to update.'}
                    </div>
                    <div className="flex gap-2 justify-end">
                        {needRefresh && updateSW && (
                            <button
                                className="px-3 py-1 bg-jap-vermilion text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-600 transition-colors"
                                onClick={() => updateSW()}
                            >
                                Reload
                            </button>
                        )}
                        <button
                            className="px-3 py-1 bg-gray-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-gray-600 transition-colors"
                            onClick={() => close()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


