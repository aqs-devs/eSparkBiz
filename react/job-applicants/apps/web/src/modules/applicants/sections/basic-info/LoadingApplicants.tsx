import { useTranslation } from "react-i18next";

export const LoadingApplicants = () => {
    const { t } = useTranslation()
    return (
        <p>{t('status.loading')}</p>
    )
}
