import { useParams } from 'react-router';

export function ProfilePage() {
  const { id } = useParams();
  const { t } = useTranslation('users');
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">{t('profile.title')}</h1>
      <p className="text-sm text-muted-foreground">{t('profile.details', { id })}</p>
    </section>
  );
}
