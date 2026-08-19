import { useTranslation } from 'react-i18next';

const DetailViewPage = () => {
  const { t } = useTranslation('basicInfo');

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{t('technologies.detailTitle')}</h1>
      <p className="text-sm text-muted-foreground">{t('technologies.detailDescription')}</p>
    </section>
  );
};

export { DetailViewPage };
