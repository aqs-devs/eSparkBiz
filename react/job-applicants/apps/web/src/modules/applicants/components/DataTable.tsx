import type {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
} from '@tanstack/react-table';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    // getPaginationRowModel,  // remove to keep server-side pagination

    // getSortedRowModel, //client-side sorting not required
    // getFilteredRowModel,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@job-applicants/ui/components/table';

import * as React from 'react';
import type { BasicInfoFilterColumn } from '@job-applicants/shared';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    sorting: SortingState;
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
    openFilter: (column: BasicInfoFilterColumn) => void;

}

export function DataTable<TData, TValue>({
    columns,
    data,
    sorting,
    setSorting,
    openFilter,


}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        // getPaginationRowModel: getPaginationRowModel(), //removed to keep server-side pagination

        onSortingChange: setSorting,
        // getSortedRowModel: getSortedRowModel(), //client side sorting is not required
        manualSorting: true,

        onColumnFiltersChange: setColumnFilters,
        // getFilteredRowModel: getFilteredRowModel(),
        manualFiltering: true,

        state: {
            sorting,
            columnFilters,
        },

        meta: {
            openFilter,
        }
    });

    // tanstack's internal constants.
    // console.debug('rows:', table.getRowCount());
    // console.debug('pageCount:', table.getPageCount());
    // console.debug('canNext:', table.getCanNextPage());
    // console.debug('data.length', data.length);

    return (
        <>
            <div className="overflow-hidden rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
