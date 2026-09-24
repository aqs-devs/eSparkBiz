import { type RouteObject, redirect } from 'react-router';
import applicantsRoutes from '../modules/applicants/routes.tsx';
import Root from '../Root.jsx';
import authRoutes from '../modules/auth/routes.tsx';
import usersRoutes from '../modules/users/routes.tsx';
import { AppShell } from '../components/app-shell';
import docsRoutes from '../modules/docs/routes';

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            // { index: true, element: <Navigate to="/docs" replace /> },
            {
                index: true,
                loader: () => redirect('/docs'),
            },
            ...docsRoutes,
            ...authRoutes,
            {
                element: <AppShell />,
                children: [...applicantsRoutes, ...usersRoutes],
            },
        ],
    },
] satisfies RouteObject[];

export default routes;
