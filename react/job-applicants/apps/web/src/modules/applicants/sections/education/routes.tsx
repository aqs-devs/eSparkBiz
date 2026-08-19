import type { RouteObject } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ListViewPage } from './pages/ListViewPage';
import { DetailViewPage } from './pages/DetailViewPage';
import { LoadingApplicants } from '../basic-info/LoadingApplicants';
import { ApplicantsError } from '../basic-info/ApplicantsError';

function EditEducationPlaceholder() {
  const { t } = useTranslation('basicInfo');
  return <div className="text-muted">{t('education.editPlaceholder')}</div>;
}

const list = [
  {
    path: 'education',
    element: <ListViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const detail = [
  {
    path: 'education',
    element: <DetailViewPage />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

const edit = [
  {
    path: 'education',
    element: <EditEducationPlaceholder />,
    errorElement: <ApplicantsError />,
    hydrateFallbackElement: <LoadingApplicants />,
  },
] satisfies RouteObject[];

export default { list, detail, edit };
