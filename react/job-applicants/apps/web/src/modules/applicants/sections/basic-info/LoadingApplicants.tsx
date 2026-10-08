import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const LoadingApplicants = () => {
    const { t } = useTranslation()
    const [isWaking, setIsWaking] = useState(false);

    useEffect(() => {
        const timeout = window.setTimeout(() => setIsWaking(true), 3000);
        return () => window.clearTimeout(timeout);
    }, []);

    return (
        <p role="status">{isWaking ? t('status.wakingServer') : t('status.loading')}</p>
    )
}
