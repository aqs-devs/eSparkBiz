import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './app/router.js';
import { ThemeProvider } from '@job-applicants/ui/components/theme-provider';
import i18n from './i18n';

// Explicit set of RTL language codes makes intent clear and is easier to extend.
const RTL_LANGUAGES = new Set(['ar']);

function App() {
    useEffect(() => {
        const updateDocumentDirection = (language = i18n.language) => {
            const lang = String(language ?? '').toLowerCase();
            const isRTL = RTL_LANGUAGES.has(lang);
            document.documentElement.lang = language;
            document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        };

        updateDocumentDirection();
        i18n.on('languageChanged', updateDocumentDirection);

        return () => {
            i18n.off('languageChanged', updateDocumentDirection);
        };
    }, []);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

createRoot(document.getElementById('root')!).render(
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        <App />
    </ThemeProvider>,
);
