import { Link, useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@job-applicants/ui/components/button';
import { buildApplicantsQueryParams } from '../lib/applicantsQueryParamBuilder';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@job-applicants/ui/utils';

type PageNavigationProps = {
    pageCount: number;
};

const PageNavigation = ({ pageCount }: PageNavigationProps) => {
    const { t } = useTranslation('common');
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const pageSize = Number(searchParams.get('pageSize')) || 10;

    return (
        <>
            <div className="flex items-center justify-between px-2">
                <div>
                    <select
                        name="pageSize"
                        id="pageLimit"
                        className="border-b-black"
                        value={pageSize}
                        onChange={(event) => {
                            const newLimit = event.target.value;

                            setSearchParams((previousParams) => {
                                // This follows the common React principle of avoiding mutation, 
                                // even though URLSearchParams itself is mutable. 
                                // It also makes the code's intent clearer: 
                                // you're producing a new set of query parameters rather than modifying the existing object in place.
                                const next = new URLSearchParams(previousParams);
                                next.set('pageSize', newLimit);

                                // Usually reset to the first page when page pageSize changes.
                                next.set('page', '1');

                                return next;
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

                <div className="flex items-center space-x-2">
                    <Link
                        to={buildApplicantsQueryParams(searchParams, {
                            page: page - 1,
                        })}
                        aria-label={t('pagination.previous')}
                        aria-disabled={page <= 1}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'icon',
                            }),
                            page <= 1 && 'pointer-events-none opacity-50',
                        )}
                    >
                        <ChevronLeft />
                    </Link>

                    <Link
                        to={buildApplicantsQueryParams(searchParams, {
                            page: page + 1,
                        })}
                        aria-label={t('pagination.next')}
                        aria-disabled={page >= pageCount}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'icon',
                            }),
                            page >= pageCount &&
                                'pointer-events-none opacity-50',
                        )}
                    >
                        <ChevronRight />
                    </Link>
                </div>
            </div>
        </>
    );
};
export default PageNavigation;
