import { useTranslation } from 'react-i18next';
import { useQueryStates } from 'nuqs';
import { buttonVariants } from '@job-applicants/ui/components/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@job-applicants/ui/utils';
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
        <div className="flex items-center justify-between px-2">
            <div>
                <select
                    name="pageSize"
                    id="pageLimit"
                    className="border-b-black"
                    value={pageSize}
                    onChange={(event) => {
                        setQueryState({
                            pageSize: Number(event.target.value),
                            page: 1,
                        });
                    }}
                >
                    <option value="10">{t('pagination.show', { count: 10 })}</option>
                    <option value="25">{t('pagination.show', { count: 25 })}</option>
                    <option value="50">{t('pagination.show', { count: 50 })}</option>
                    <option value="100">{t('pagination.show', { count: 100 })}</option>
                </select>
            </div>
            <div>
                {t('pagination.pageOf', { page, pageCount })}
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setQueryState({ page: page - 1 })}
                    aria-label={t('pagination.previous')}
                    aria-disabled={page <= 1}
                    className={cn(
                        buttonVariants({ variant: 'outline', size: 'icon' }),
                        page <= 1 && 'pointer-events-none opacity-50',
                    )}
                >
                    {isRTL ? <ChevronRight /> : <ChevronLeft />}
                </button>

                <button
                    type="button"
                    onClick={() => setQueryState({ page: page + 1 })}
                    aria-label={t('pagination.next')}
                    aria-disabled={page >= pageCount}
                    className={cn(
                        buttonVariants({ variant: 'outline', size: 'icon' }),
                        page >= pageCount && 'pointer-events-none opacity-50',
                    )}
                >
                    {isRTL ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>
        </div>
    );
};

export default PageNavigation;
