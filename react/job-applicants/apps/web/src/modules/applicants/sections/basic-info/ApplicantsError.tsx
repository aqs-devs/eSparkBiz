import { isRouteErrorResponse, useRouteError } from "react-router";
import { useTranslation } from "react-i18next";

export function ApplicantsError() {
    const { t } = useTranslation('common');
    const error = useRouteError();

    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
            <section>
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
            </section>
        );
    }

    if (error instanceof Error) {
        return (
            <section>
                <h1>{t('errors.applicationError')}</h1>
                <p>{error.message}</p>
            </section>
        );
    }

    return <p>{t('errors.unknown')}</p>;
}
