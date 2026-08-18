import type {CellContext, ColumnDef, HeaderContext, RowData,} from '@tanstack/react-table';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import { Link } from 'react-router';
import { Button, buttonVariants } from '@job-applicants/ui/components/button';
import { tableBasicInfoFields, type FilterableBasicInfoField, type Formatter, type TableBasicInfoField } from '@job-applicants/shared';
import type { BasicInfo } from '@job-applicants/schemas';
import { DeleteApplicantAction } from '../../components/DeleteApplicantAction';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        openFilter: (column: FilterableBasicInfoField['key']) => void;
        revalidate: () => void;
    }
}

function createColumn(field: TableBasicInfoField): ColumnDef<BasicInfo> {
    return {
        accessorKey: field.key,
        header: createHeader(field),

        ...(field.formatter && {
            cell: createCellFormatter(field.formatter),
        }),
    };
}

function createHeader(field: TableBasicInfoField,): ColumnDef<BasicInfo>['header'] {
    return ({ table, column }: HeaderContext<BasicInfo, unknown>) => {
        // console.log("rendering header", field.key);
        return(
                <div className="flex items-center gap-2">
                {field.sortable ? (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        <span>{field.label}</span>
                        <ArrowUpDown className="h-4 w-4" />
                    </Button>
                ) : (
                    <span>{field.label}</span>
                )}

                {field.filter && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => table.options.meta?.openFilter(field.key)}
                    >
                        <ListFilter />
                    </Button>
                )}
                </div>
    )};
}

function createCellFormatter(formatter: Formatter) {
    switch (formatter) {
        case 'date':
            return ({ getValue }: CellContext<BasicInfo, unknown>) => {
                const value = getValue() as string | null;

                if (!value) return '—';

                return new Date(value).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                });
            };

        default:
            return undefined;
    }
}

const dataColumns = tableBasicInfoFields.map(createColumn);

const actionsColumn: ColumnDef<BasicInfo> = {
    id: 'actions',
    header: 'Actions',
    enableSorting: false,
    enableHiding: false,
    cell: ({ row, table }) => (
        <div className="flex items-center gap-2">
            <Link
                to={`/applicants/${row.original.id}/basic-info`}
                className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                })}
            >
                View
            </Link>
    
            <DeleteApplicantAction
                applicantId={row.original.id}
                onDeleted={() => table.options.meta?.revalidate()}
                onRestored={() => table.options.meta?.revalidate()}
            />
        </div>
    ),
};

export const columns: ColumnDef<BasicInfo>[] = [...dataColumns, actionsColumn];
