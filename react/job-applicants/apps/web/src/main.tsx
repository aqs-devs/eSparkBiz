import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7';
import router from './app/router.js';
import { ThemeProvider } from '@job-applicants/ui/components/theme-provider';
import i18n from './i18n';
import { TooltipProvider } from '@job-applicants/ui/components/tooltip';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';

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
            <NuqsAdapter>
                <RouterProvider router={router} />
            </NuqsAdapter>
        </>
    );
}

const root = createRoot(document.getElementById('root')!);

root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <TooltipProvider>
                <App />
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>,
);