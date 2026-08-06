import { useEffect, useRef, useState } from 'react';
import type { BasicInfoFilterColumn, BasicInfoFilterOptions, ActiveFilters, ActiveFilterValue, DateRangeValue } from '@job-applicants/shared';
import { Plus, X } from 'lucide-react';
import { Button } from "@job-applicants/ui/components/button";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { filterableBasicInfoFields } from '@job-applicants/shared'

type FilterBarProps = {
    activeFilters: ActiveFilters;
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

export function FilterBar({
    activeFilters,
    filterOptions,
    loadingFilters,
    pendingColumn,
    pendingValues,
    onSelectColumn,
    onApplyFilter,
    onRemoveFilter,
    onChangePendingValues,
    onClearPending,
    onReset,
}: FilterBarProps) {
    const [isColumnPickerOpen, setIsColumnPickerOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const pendingChipRef = useRef<HTMLDivElement>(null);
    const [pendingDateRange, setPendingDateRange] = useState<{ from?: Date; to?: Date }>({});

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
                setIsColumnPickerOpen(false);
            }
            if (pendingChipRef.current && !pendingChipRef.current.contains(e.target as Node)) {
                onClearPending();
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [onClearPending]);

    const appliedColumns = Object.keys(activeFilters) as BasicInfoFilterColumn[];
    const remainingColumns = filterableBasicInfoFields.filter(
        (col) => !activeFilters[col.key] && col.key !== pendingColumn
    );

    function togglePendingValue(value: string) {
        onChangePendingValues(
            pendingValues.includes(value)
                ? pendingValues.filter((v) => v !== value)
                : [...pendingValues, value]
        );
    }

    // #TITLE: calendar
    function toLocalDateString(date: Date): string {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
        ].join('-');
    }
    
    function parseInputDate(input: string): Date | undefined {
        const parsed = new Date(input);
        return isNaN(parsed.getTime()) ? undefined : parsed;
    }
    
    function formatDisplayDate(date: Date | undefined): string {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    return (
        <div className="flex flex-wrap items-center gap-2 p-2 border-b">

            {/* Applied chips */}
            {appliedColumns.map((col) => {
                const config = filterableBasicInfoFields.find((c) => c.key === col)!;
                const value = activeFilters[col]!;

                let label: string;
                if (Array.isArray(value)) {
                    label = `${config.label}: ${value.join(', ')}`;
                } else {
                    const from = value.from ? new Date(value.from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;
                    const to = value.to ? new Date(value.to).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null;
                    label = `${config.label}: ${from ?? ''}${from && to ? ' → ' : ''}${to ?? ''}`;
                }

                return (
                    <div key={col} className="flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 max-w-48">
                        <span className="truncate">{label}</span>
                        <button onClick={() => onRemoveFilter(col)} className="ml-1 shrink-0 rounded-full hover:bg-blue-200 p-0.5">
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                );
            })}

            {/* Pending chip */}
            {pendingColumn && (() => {
                const config = filterableBasicInfoFields.find((c) => c.key === pendingColumn)!;
                return (
                    <div ref={pendingChipRef} className="relative">
                        <div className="flex items-center gap-1 rounded-full border border-blue-400 bg-white px-3 py-1 text-sm text-blue-800">
                            <span className="font-medium">{config.label}</span>
                            <X onClick={onClearPending} className="h-3 w-3 cursor-pointer opacity-50 hover:opacity-100" />
                        </div>

                        <div className="absolute left-0 top-full z-50 mt-1 rounded-md border bg-white shadow-lg">
                            {config.filter.type === 'daterange' ? (
                                <div className="p-3 w-fit">
                                    {/* From / To text inputs */}
                                    <div className="flex gap-2 mb-3">
                                        <div className="flex items-center gap-1 border rounded px-2 py-1 text-sm flex-1">
                                            <input
                                                className="outline-none w-full"
                                                placeholder="Start date"
                                                value={formatDisplayDate(pendingDateRange.from)}
                                                onChange={(e) => {
                                                    const parsed = parseInputDate(e.target.value);
                                                    setPendingDateRange((prev) => ({ ...prev, from: parsed }));
                                                }}
                                            />
                                            {pendingDateRange.from && (
                                                <button onClick={() => setPendingDateRange((prev) => ({ ...prev, from: undefined }))}>
                                                    <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 border rounded px-2 py-1 text-sm flex-1">
                                            <input
                                                className="outline-none w-full"
                                                placeholder="End date"
                                                value={formatDisplayDate(pendingDateRange.to)}
                                                onChange={(e) => {
                                                    const parsed = parseInputDate(e.target.value);
                                                    setPendingDateRange((prev) => ({ ...prev, to: parsed }));
                                                }}
                                            />
                                            {pendingDateRange.to && (
                                                <button onClick={() => setPendingDateRange((prev) => ({ ...prev, to: undefined }))}>
                                                    <X className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Calendar */}
                                    <DayPicker
                                        mode="range"
                                        captionLayout="dropdown"
                                        selected={{ from: pendingDateRange.from, to: pendingDateRange.to }}
                                        onSelect={(range) => setPendingDateRange({ from: range?.from, to: range?.to })}
                                    />

                                    <div className="flex justify-end gap-2 border-t pt-2 mt-1">
                                        <button onClick={onClearPending} className="text-xs text-gray-400 hover:text-gray-600">
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                const value: DateRangeValue = {
                                                    // timezone fix — use local date not UTC
                                                    from: pendingDateRange.from ? toLocalDateString(pendingDateRange.from) : undefined,
                                                    to: pendingDateRange.to ? toLocalDateString(pendingDateRange.to) : undefined,
                                                };
                                                if (value.from || value.to) {
                                                    onApplyFilter(pendingColumn, value);
                                                }
                                            }}
                                            disabled={!pendingDateRange.from && !pendingDateRange.to}
                                            className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-40"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {loadingFilters ? (
                                        <p className="px-3 py-2 text-sm text-gray-400 italic">Loading...</p>
                                    ) : (
                                        <>
                                            <div className="max-h-48 overflow-y-auto">
                                                {(filterOptions?.[pendingColumn] ?? []).map((opt) => (
                                                    <label key={opt} className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
                                                        <input
                                                            type="checkbox"
                                                            checked={pendingValues.includes(opt)}
                                                            onChange={() => togglePendingValue(opt)}
                                                            className="rounded"
                                                        />
                                                        <span>{opt}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            <div className="flex justify-end gap-2 border-t px-3 py-2">
                                                <button onClick={onClearPending} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
                                                <button
                                                    onClick={() => {
                                                        if (pendingValues.length > 0) onApplyFilter(pendingColumn, pendingValues);
                                                    }}
                                                    disabled={pendingValues.length === 0}
                                                    className="text-xs text-blue-600 hover:text-blue-800 disabled:opacity-40"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })()}

            {/* + Add Filter */}
            <div className="relative" ref={popoverRef}>
                <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-sm text-gray-500"
                    onClick={() => setIsColumnPickerOpen((prev) => !prev)}
                >
                    <Plus className="h-4 w-4" />
                    Add Filter
                </Button>

                {isColumnPickerOpen && (
                    <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-md border bg-white shadow-lg">
                        {remainingColumns.length === 0 ? (
                            <p className="px-3 py-2 text-sm text-gray-400">No more filters</p>
                        ) : (
                            remainingColumns.map((col) => (
                                <button
                                    key={col.key}
                                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => {
                                        setIsColumnPickerOpen(false);
                                        onSelectColumn(col.key);
                                    }}
                                >
                                    {col.label}
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="ms-auto text-sm text-gray-400 hover:text-red-500 transition-colors"
            >
                Reset
            </button>

        </div>
    );
}