import type { RouteObject } from 'react-router';
import applicantsRoutes from '../modules/applicants/routes.tsx';
import Root from '../Root.jsx';
import authRoutes from '../modules/auth/routes.tsx';
import usersRoutes from '../modules/users/routes.tsx';
import { AppShell } from '../components/app-shell';

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            ...authRoutes,
            {
                element: <AppShell />,
                children: [
                    ...applicantsRoutes,
                    ...usersRoutes,
                ],
            },
        ],
    },
]  satisfies RouteObject[]

export default routes;
