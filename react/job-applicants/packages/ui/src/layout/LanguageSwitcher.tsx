import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/select';
import { useTranslation } from 'react-i18next';
import { GlobeIcon } from 'lucide-react';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common');
  const value = i18n.resolvedLanguage ?? 'en';

  return (
    <Select
      value={value}
      onValueChange={(language) => {
        if (language == null) return;
        void i18n.changeLanguage(language);
      }}
    >
      {/* Trigger shows a globe icon as requested; keep the SelectValue for accessibility but visually hide it */}
      <SelectTrigger aria-label={t('selectLanguage')} className="w-fit">
        <GlobeIcon className="size-4 text-muted-foreground" />
        <SelectValue className="sr-only" placeholder={t('language')} />
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
