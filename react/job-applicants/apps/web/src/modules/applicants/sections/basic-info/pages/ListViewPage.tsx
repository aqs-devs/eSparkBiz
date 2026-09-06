import { Link, useLoaderData, useRevalidator } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQueryStates } from 'nuqs';
import PageNavigation from '#src/modules/applicants/components/PageNavigator';
import { columns } from '../columns';
import { useEffect, useState } from 'react';
import { getFilterOptions } from '@job-applicants/api-client';
import type { loadApplicants } from '../loaders';
import type { SortingState } from '@tanstack/react-table';
import type {
    ActiveFilters,
    ActiveFilterValue,
    BasicInfoFilterColumn,
    BasicInfoFilterOptions,
} from '@job-applicants/shared';
import { RouteBuilder } from '@job-applicants/shared';
import { FilterBar } from '#src/modules/applicants/components/FilterBar';
import { DataTable } from '#src/modules/applicants/components/DataTable';
import { buttonVariants } from '@job-applicants/ui/components/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
    basicInfoListQueryOptions,
    basicInfoListQueryParsers,
} from '../listQueryState';

const ListViewPage = () => {
    const { t } = useTranslation('basicInfo');
    const { applicants, pagination } = useLoaderData() as Awaited<ReturnType<typeof loadApplicants>>;
    const pageCount = pagination.pageCount;
    const [queryState, setQueryState] = useQueryStates(
        basicInfoListQueryParsers,
        basicInfoListQueryOptions,
    );
    const {
        page,
        sortOn,
        order,
        city,
        designation,
        state,
        country,
        gender,
        relationshipStatus,
        dobFrom,
        dobTo,
    } = queryState;
    const [pendingColumn, setPendingColumn] = useState<BasicInfoFilterColumn | null>(null);
    const [pendingValues, setPendingValues] = useState<string[]>([]);
    const [filterOptions, setFilterOptions] = useState<BasicInfoFilterOptions | null>(null);
    const [loadingFilters, setLoadingFilters] = useState(false);
    const [isFilterBarVisible, setIsFilterBarVisible] = useState(false);
    const revalidator = useRevalidator();

    const sorting: SortingState = sortOn
        ? [{ id: sortOn, desc: order === 'desc' }]
        : [];
    const activeFilters: ActiveFilters = {
        ...(city.length > 0 ? { city } : {}),
        ...(designation.length > 0 ? { designation } : {}),
        ...(state.length > 0 ? { state } : {}),
        ...(country.length > 0 ? { country } : {}),
        ...(gender.length > 0 ? { gender } : {}),
        ...(relationshipStatus.length > 0 ? { relationshipStatus } : {}),
        ...(dobFrom || dobTo ? { dob: { from: dobFrom ?? undefined, to: dobTo ?? undefined } } : {}),
    };

    useEffect(() => {
        if (Object.keys(activeFilters).length > 0) setIsFilterBarVisible(true);
    }, [activeFilters]);

    async function openFilter(column: BasicInfoFilterColumn) {
        setIsFilterBarVisible(true);
        setPendingColumn(column);
        const currentValue = activeFilters[column];
        setPendingValues(Array.isArray(currentValue) ? currentValue : []);
        if (filterOptions || loadingFilters) return;
        setLoadingFilters(true);
        try {
            setFilterOptions(await getFilterOptions());
        } catch {
            toast.error(t('errors.filterOptionsFailed'));
        } finally {
            setLoadingFilters(false);
        }
    }

    function clearPending() {
        setPendingColumn(null);
        setPendingValues([]);
    }

    function updateFilter(column: BasicInfoFilterColumn, value: ActiveFilterValue | null) {
        const next = { page: 1 };
        switch (column) {
            case 'city':
                setQueryState({ ...next, city: value ?? [] });
                break;
            case 'designation':
                setQueryState({ ...next, designation: value ?? [] });
                break;
            case 'state':
                setQueryState({ ...next, state: value ?? [] });
                break;
            case 'country':
                setQueryState({ ...next, country: value ?? [] });
                break;
            case 'gender':
                setQueryState({ ...next, gender: value ?? [] });
                break;
            case 'relationshipStatus':
                setQueryState({ ...next, relationshipStatus: value ?? [] });
                break;
            case 'dob': {
                const dateRange = value && !Array.isArray(value) ? value : {};
                setQueryState({
                    ...next,
                    dobFrom: dateRange.from ?? null,
                    dobTo: dateRange.to ?? null,
                });
                break;
            }
        }
    }

    function applyFilter(column: BasicInfoFilterColumn, value: ActiveFilterValue) {
        updateFilter(column, value);
        setPendingColumn(null);
        setPendingValues([]);
    }

    function removeFilter(column: BasicInfoFilterColumn) {
        updateFilter(column, null);
    }

    function resetFilters() {
        setPendingColumn(null);
        setPendingValues([]);
        setIsFilterBarVisible(false);
        setQueryState({
            page: 1,
            city: [],
            designation: [],
            state: [],
            country: [],
            gender: [],
            relationshipStatus: [],
            dobFrom: null,
            dobTo: null,
        });
    }

    function setSorting(nextSorting: React.SetStateAction<SortingState>) {
        const next = typeof nextSorting === 'function' ? nextSorting(sorting) : nextSorting;
        const sort = next[0];
        setQueryState({
            page: 1,
            sortOn: sort?.id ?? null,
            order: sort ? (sort.desc ? 'desc' : 'asc') : null,
        });
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t('list.title')}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t('list.subtitle')}
                    </p>
                </div>

                <Link
                    to={RouteBuilder.applicants.basicInfo.create()}
                    className={buttonVariants()}
                >
                    <Plus className="size-4" />
                    {t('actions.newApplicant')}
                </Link>
            </div>

            {isFilterBarVisible && (
                <FilterBar
                    activeFilters={activeFilters}
                    filterOptions={filterOptions}
                    loadingFilters={loadingFilters}
                    pendingColumn={pendingColumn}
                    pendingValues={pendingValues}
                    onSelectColumn={openFilter}
                    onApplyFilter={applyFilter}
                    onRemoveFilter={removeFilter}
                    onChangePendingValues={setPendingValues}
                    onClearPending={clearPending}
                    onReset={resetFilters}
                />
            )}

            <DataTable
                columns={columns}
                data={applicants}
                sorting={sorting}
                setSorting={setSorting}
                openFilter={openFilter}
                revalidate={() => revalidator.revalidate()}
            />

            <PageNavigation pageCount={pageCount} />
        </div>
    );
};

export { ListViewPage };
