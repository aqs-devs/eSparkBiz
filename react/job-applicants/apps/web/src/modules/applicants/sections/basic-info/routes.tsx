import type { RouteObject } from 'react-router';
import { ListViewPage } from './pages/ListViewPage';
import { loadApplicant, loadApplicants } from './loaders';
import { ApplicantsError } from './ApplicantsError';
import { LoadingApplicants } from './LoadingApplicants';
import { DetailViewPage } from './pages/DetailViewPage';
import { DetailEditPage } from './pages/DetailEditPage';

const list = [
    {
        path: 'basic-info',
        element: <ListViewPage />,
        loader: loadApplicants,
        errorElement: <ApplicantsError />,
        hydrateFallbackElement: <LoadingApplicants />
    },
] satisfies RouteObject[];

const detail = [
    {
        path: 'basic-info',
        element: <DetailViewPage />,
        loader: loadApplicant,
        errorElement: <ApplicantsError />,
        hydrateFallbackElement: <LoadingApplicants />
    },
] satisfies RouteObject[];

const edit = [
    {
        path: 'basic-info',
        element:  <DetailEditPage />,
        loader: loadApplicant,
        errorElement: <ApplicantsError />,
        hydrateFallbackElement: <LoadingApplicants />
    },
] satisfies RouteObject[];

//NOTE: create is /route in /applicants/routes.tsx
// const create = [
//     {
//         path: 'basic-info',
//         element:  <CreatePage />,
//         errorElement: <ApplicantsError />,
//         hydrateFallbackElement: <LoadingApplicants />
//     },
// ] satisfies RouteObject[];

export default { list, detail, edit };
