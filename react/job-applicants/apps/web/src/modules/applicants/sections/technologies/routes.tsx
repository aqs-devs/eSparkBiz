import type { RouteObject } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ListViewPage } from './pages/ListViewPage';
import { DetailViewPage } from './pages/DetailViewPage';
import { LoadingApplicants } from '../basic-info/LoadingApplicants';
import { ApplicantsError } from '../basic-info/ApplicantsError';

function EditTechnologyPlaceholder() {
  const { t } = useTranslation('basicInfo');
  return <div className="text-muted">{t('technologies.editPlaceholder')}</div>;
}

const list = [
  {
    path: 'technologies',
    element: <ListViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const detail = [
  {
    path: 'technologies',
    element: <DetailViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const edit = [
  {
    path: 'technologies',
    element: <EditTechnologyPlaceholder />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

export default { list, detail, edit };
