import { useEffect, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ActiveFilterValue, BasicInfoFilterColumn, BasicInfoFilterOptions, DateRangeValue } from '@job-applicants/shared';
import { Button } from '@job-applicants/ui/components/button';
import { Calendar } from '@job-applicants/ui/components/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@job-applicants/ui/components/command';
import { Input } from '@job-applicants/ui/components/input';
import { Popover, PopoverContent, PopoverTrigger } from '@job-applicants/ui/components/popover';
import { cn } from '@job-applicants/ui/lib/utils';
import { filterableBasicInfoFields } from '@job-applicants/shared';
import { formatDisplayDate, parseIsoDate, toIsoDate } from './date-utils';

type PendingFilterProps = {
    column: BasicInfoFilterColumn;
    activeValue: ActiveFilterValue | undefined;
    filterOptions: BasicInfoFilterOptions | null;
    loadingFilters: boolean;
    pendingValues: string[];
    onChangePendingValues: (values: string[]) => void;
    onApply: (value: ActiveFilterValue) => void;
    onClear: () => void;
};

type DateRangeFilterProps = Pick<PendingFilterProps, 'onApply' | 'onClear'> & { activeValue: ActiveFilterValue | undefined };

function DateRangeFilter({ activeValue, onApply, onClear }: DateRangeFilterProps) {
    const { t } = useTranslation('common');
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
    useEffect(() => {
        setRange(activeValue && !Array.isArray(activeValue) ? { from: parseIsoDate(activeValue.from), to: parseIsoDate(activeValue.to) } : {});
    }, [activeValue]);
    const apply = () => {
        if (!range.from && !range.to) return;
        const value: DateRangeValue = { from: range.from ? toIsoDate(range.from) : undefined, to: range.to ? toIsoDate(range.to) : undefined };
        onApply(value);
    };
    return <div className="space-y-2"><div className="grid grid-cols-2 gap-2">
        <Input type="date" aria-label={t('filters.startDate')} value={range.from ? toIsoDate(range.from) : ''} onChange={(event) => setRange((current) => ({ ...current, from: parseIsoDate(event.target.value) }))} />
        <Input type="date" aria-label={t('filters.endDate')} value={range.to ? toIsoDate(range.to) : ''} onChange={(event) => setRange((current) => ({ ...current, to: parseIsoDate(event.target.value) }))} />
    </div><Calendar mode="range" selected={range} onSelect={(next) => setRange({ from: next?.from, to: next?.to })} />
        <div className="flex items-center justify-between border-t border-border pt-2"><span className="text-xs text-muted-foreground">{formatDisplayDate(range.from)}{range.from && range.to ? ' → ' : ''}{formatDisplayDate(range.to)}</span><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={onClear}>{t('actions.cancel')}</Button><Button size="sm" disabled={!range.from && !range.to} onClick={apply}>{t('actions.apply')}</Button></div></div>
    </div>;
}

function MultiSelectFilter({ column, filterOptions, loadingFilters, pendingValues, onChangePendingValues, onApply, onClear }: PendingFilterProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');
    const options = (filterOptions?.[column as keyof BasicInfoFilterOptions] ?? []) as string[];
    return <Command><CommandInput placeholder={tBasicInfo(`fields.${column}`)} aria-label={tBasicInfo(`fields.${column}`)} /><CommandList>{loadingFilters ? <p className="px-2 py-6 text-center text-sm text-muted-foreground" role="status">{t('status.loading')}</p> : <><CommandEmpty>{t('table.noResults')}</CommandEmpty><CommandGroup>{options.map((option) => { const checked = pendingValues.includes(option); return <CommandItem key={option} value={option} onSelect={() => onChangePendingValues(checked ? pendingValues.filter((item) => item !== option) : [...pendingValues, option])} aria-selected={checked}><Check className={cn('me-2', checked ? 'opacity-100' : 'opacity-0')} />{option}</CommandItem>; })}</CommandGroup></>}</CommandList><div className="flex justify-end gap-2 border-t border-border pt-2"><Button variant="ghost" size="sm" onClick={onClear}>{t('actions.cancel')}</Button><Button size="sm" disabled={loadingFilters || pendingValues.length === 0} onClick={() => onApply(pendingValues)}>{t('actions.apply')}</Button></div></Command>;
}

export function PendingFilter(props: PendingFilterProps) {
    const { t: tBasicInfo } = useTranslation('basicInfo');
    const config = filterableBasicInfoFields.find(({ key }) => key === props.column);
    if (!config) return null;
    return <Popover open onOpenChange={(open) => { if (!open) props.onClear(); }}><PopoverTrigger render={<Button variant="secondary" size="sm" className="w-fit max-w-full" />}><span className="truncate">{tBasicInfo(`fields.${props.column}`)}</span><ChevronDown /></PopoverTrigger><PopoverContent align="start" className="w-[min(22rem,calc(100vw-2rem))] p-2">{config.filter.type === 'daterange' ? <DateRangeFilter activeValue={props.activeValue} onApply={props.onApply} onClear={props.onClear} /> : <MultiSelectFilter {...props} />}</PopoverContent></Popover>;
}
