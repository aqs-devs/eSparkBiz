import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import router from './app/router.js';
import { ThemeProvider } from '@job-applicants/ui/components/theme-provider';
import { Toaster } from '@job-applicants/ui/components/sonner';
import './i18n';

// const router = createBrowserRouter(
//   // createRoutesFromElements(
//   //   <Route path='/' element={<Root />}>
//   //   <Route path="applicants" element={<ApplicantsLayoutPage />}>
//   //       <Route index element={<ApplicantsPage />} />
//   //       {/* <Route path=":id" element={<ApplicantDetailPage />} /> */}
//   //     </Route>
//   //   </Route>
//   // )
// )

createRoot(document.getElementById('root')).render(
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>,
    );