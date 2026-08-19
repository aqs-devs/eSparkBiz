import { useTranslation } from 'react-i18next';

export function SignUpPage() {
  const { t } = useTranslation('auth');

  return (
    <section className="space-y-6 rounded-xl border border-border bg-white p-6 shadow-sm">
      <h1 className="text-3xl font-semibold">{t('signUp.title')}</h1>
      <form className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">{t('signUp.fullName')}</span>
          <input name="name" type="text" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">{t('signUp.email')}</span>
          <input name="email" type="email" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-muted-foreground">{t('signUp.password')}</span>
          <input name="password" type="password" className="mt-1 block w-full rounded-md border px-3 py-2" />
        </label>
        <button type="submit" className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-white">
          {t('signUp.createAccount')}
        </button>
      </form>
    </section>
  );
}
