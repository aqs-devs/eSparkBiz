import { useState } from 'react';
import type { ActiveFilterValue, ActiveFilters as ActiveFiltersState, BasicInfoFilterColumn, BasicInfoFilterOptions } from '@job-applicants/shared';
import { filterableBasicInfoFields } from '@job-applicants/shared';
import { useTranslation } from 'react-i18next';
import { Button } from '@job-applicants/ui/components/button';
import { AddFilter } from './filter-bar/AddFilter';
import { ActiveFilters } from './filter-bar/ActiveFilters';
import { PendingFilter } from './filter-bar/PendingFilter';

type FilterBarProps = {
    activeFilters: ActiveFiltersState;
    filterOptions: BasicInfoFilterOptions | null;
    loadingFilters: boolean;
    pendingColumn: BasicInfoFilterColumn | null;
    pendingValues: string[];
    onSelectColumn: (column: BasicInfoFilterColumn) => void;
    onApplyFilter: (column: BasicInfoFilterColumn, value: ActiveFilterValue) => void;
    onRemoveFilter: (column: BasicInfoFilterColumn) => void;
    onChangePendingValues: (values: string[]) => void;
    onClearPending: () => void;
    onReset: () => void;
};

export function FilterBar(props: FilterBarProps) {
    const { t } = useTranslation('common');
    const [columnPickerOpen, setColumnPickerOpen] = useState(false);
    const remainingColumns = filterableBasicInfoFields.filter(({ key }) => !props.activeFilters[key] && key !== props.pendingColumn);
    const pendingValue = props.pendingColumn ? props.activeFilters[props.pendingColumn] : undefined;
    return <section aria-label={t('filters.title', { defaultValue: 'Applicant filters' })} className="flex flex-col gap-3 border-b border-border pb-3"><div className="flex flex-wrap items-center gap-2"><ActiveFilters filters={props.activeFilters} onRemove={props.onRemoveFilter} /><AddFilter columns={remainingColumns} open={columnPickerOpen} onOpenChange={setColumnPickerOpen} onSelect={props.onSelectColumn} /><Button variant="ghost" size="sm" className="ms-auto text-muted-foreground" onClick={props.onReset}>{t('actions.reset')}</Button></div>{props.pendingColumn && <PendingFilter column={props.pendingColumn} activeValue={pendingValue} filterOptions={props.filterOptions} loadingFilters={props.loadingFilters} pendingValues={props.pendingValues} onChangePendingValues={props.onChangePendingValues} onApply={(value) => props.onApplyFilter(props.pendingColumn!, value)} onClear={props.onClearPending} />}</section>;
}
