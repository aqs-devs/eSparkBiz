import type { RouteObject } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ListViewPage } from './pages/ListViewPage';
import { DetailViewPage } from './pages/DetailViewPage';
import { LoadingApplicants } from '../basic-info/LoadingApplicants';
import { ApplicantsError } from '../basic-info/ApplicantsError';

function EditExperiencePlaceholder() {
  const { t } = useTranslation('basicInfo');
  return <div className="text-muted">{t('experience.editPlaceholder')}</div>;
}

const list = [
  {
    path: 'experience',
    element: <ListViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const detail = [
  {
    path: 'experience',
    element: <DetailViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const edit = [
  {
    path: 'experience',
    element: <EditExperiencePlaceholder />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

export default { list, detail, edit };
