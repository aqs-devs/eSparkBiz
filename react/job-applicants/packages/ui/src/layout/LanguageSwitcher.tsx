import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select';
import { useTranslation } from 'react-i18next';
import { GlobeIcon } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const value = i18n.resolvedLanguage ?? 'en';
  const languageLabel = value === 'ar' ? 'العربية' : 'English';

  return (
    <Select
      value={value}
      onValueChange={(language) => {
        if (language == null) return;
        void i18n.changeLanguage(language);
      }}
    >
      <SelectTrigger aria-label={t('selectLanguage')} className="w-fit">
        <GlobeIcon className="size-4 text-muted-foreground" />
        <SelectValue className="max-[360px]:hidden" placeholder={t('language')}>
          {languageLabel}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {/* Hide the check indicator for language items so no tick is shown when selected */}
        <SelectItem value="en" hideIndicator>
          English
        </SelectItem>
        <SelectItem value="ar" hideIndicator>
          العربية
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
