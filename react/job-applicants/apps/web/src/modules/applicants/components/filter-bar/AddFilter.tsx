import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { BasicInfoFilterColumn } from '@job-applicants/shared';
import { Button } from '@job-applicants/ui/components/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@job-applicants/ui/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@job-applicants/ui/components/popover';

type AddFilterProps = {
    columns: { key: BasicInfoFilterColumn }[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (column: BasicInfoFilterColumn) => void;
};

export function AddFilter({ columns, open, onOpenChange, onSelect }: AddFilterProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');
    return (
        <Popover open={open} onOpenChange={onOpenChange}>
            <PopoverTrigger render={<Button variant="outline" size="sm" />}><Plus /> {t('actions.addFilter')}</PopoverTrigger>
            <PopoverContent align="start" className="w-56 p-1">
                <Command>
                    <CommandInput placeholder={t('actions.addFilter')} aria-label={t('actions.addFilter')} />
                    <CommandList>
                        <CommandEmpty>{columns.length === 0 ? t('filters.noMoreFilters') : t('table.noResults')}</CommandEmpty>
                        <CommandGroup>
                            {columns.map(({ key }) => {
                                const label = tBasicInfo(`fields.${key}`);
                                return <CommandItem key={key} value={label} keywords={[key]} onSelect={() => { onOpenChange(false); onSelect(key); }}>{label}</CommandItem>;
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
