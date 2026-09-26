import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ActiveFilters as ActiveFiltersState, BasicInfoFilterColumn } from '@job-applicants/shared';
import { Button } from '@job-applicants/ui/components/button';
import { formatDisplayDate, parseIsoDate } from './date-utils';

type ActiveFiltersProps = { filters: ActiveFiltersState; onRemove: (column: BasicInfoFilterColumn) => void };

export function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');
    return <>{Object.entries(filters).map(([column, value]) => {
        const key = column as BasicInfoFilterColumn;
        const label = tBasicInfo(`fields.${key}`);
        const text = Array.isArray(value) ? value.join(', ') : `${formatDisplayDate(parseIsoDate(value.from))}${value.from && value.to ? ' → ' : ''}${formatDisplayDate(parseIsoDate(value.to))}`;
        return <div key={key} className="flex min-w-0 max-w-full items-center gap-1 rounded-md border border-border bg-muted px-2.5 py-1 text-sm"><span className="max-w-56 truncate"><span className="text-muted-foreground">{label}:</span> {text}</span><Button variant="ghost" size="icon-xs" className="shrink-0" onClick={() => onRemove(key)} aria-label={`${t('actions.clear', { defaultValue: 'Clear' })} ${label}`}><X /></Button></div>;
    })}</>;
}
