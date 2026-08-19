import { useTranslation } from 'react-i18next';

export function UsersPage() {
  const { t } = useTranslation('users');

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">{t('users.title')}</h1>
      <p className="text-sm text-muted-foreground">
        {t('users.description')}
      </p>
    </section>
  );
}
