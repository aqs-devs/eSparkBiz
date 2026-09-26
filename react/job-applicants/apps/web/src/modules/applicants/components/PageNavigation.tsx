import { useTranslation } from 'react-i18next';
import { useQueryStates } from 'nuqs';
import { Button } from '@job-applicants/ui/components/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@job-applicants/ui/components/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
    basicInfoListQueryOptions,
    basicInfoListQueryParsers,
} from '../sections/basic-info/listQueryState';

type PageNavigationProps = {
    pageCount: number;
};

const PageNavigation = ({ pageCount }: PageNavigationProps) => {
    const { t, i18n } = useTranslation('common');
    const [{ page, pageSize }, setQueryState] = useQueryStates(
        basicInfoListQueryParsers,
        basicInfoListQueryOptions,
    );
    const isRTL = i18n.dir() === 'rtl';

    return (
        <nav aria-label={t('pagination.label', { defaultValue: 'Pagination' })} className="flex flex-wrap items-center justify-between gap-3 px-2 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
            <div className="flex items-center gap-2">
                <span id="pageLimitLabel" className="sr-only">
                    {t('pagination.pageSize', { defaultValue: 'Items per page' })}
                </span>
                <Select
                    value={pageSize}
                    onValueChange={(value) => {
                        if (value) {
                            setQueryState({
                                pageSize: Number(value),
                                page: 1,
                            });
                        }
                    }}
                >
                    <SelectTrigger
                        size="sm"
                        aria-labelledby="pageLimitLabel"
                        className="min-w-28"
                    >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent align="start">
                        <SelectItem value="10">{t('pagination.show', { count: 10 })}</SelectItem>
                        <SelectItem value="25">{t('pagination.show', { count: 25 })}</SelectItem>
                        <SelectItem value="50">{t('pagination.show', { count: 50 })}</SelectItem>
                        <SelectItem value="100">{t('pagination.show', { count: 100 })}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="text-sm text-muted-foreground sm:justify-self-center" aria-live="polite">
                {t('pagination.pageOf', { page, pageCount })}
            </div>

            <div className="flex items-center gap-2 sm:justify-self-end">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQueryState({ page: page - 1 })}
                    aria-label={t('pagination.previous')}
                    disabled={page <= 1}
                >
                    {isRTL ? <ChevronRight /> : <ChevronLeft />}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setQueryState({ page: page + 1 })}
                    aria-label={t('pagination.next')}
                    disabled={page >= pageCount}
                >
                    {isRTL ? <ChevronLeft /> : <ChevronRight />}
                </Button>
            </div>
        </nav>
    );
};

export default PageNavigation;
