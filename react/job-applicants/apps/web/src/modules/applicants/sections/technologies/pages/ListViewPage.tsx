import { useTranslation } from 'react-i18next';

const ListViewPage = () => {
  const { t } = useTranslation('basicInfo');

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{t('technologies.listTitle')}</h1>
      <p className="text-sm text-muted-foreground">{t('technologies.listDescription')}</p>
    </section>
  );
};

export { ListViewPage };
