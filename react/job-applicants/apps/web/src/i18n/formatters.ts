import i18n from './index';

export function formatDate(
    value: Date | string,
    options?: Intl.DateTimeFormatOptions,
): string {
    return new Intl.DateTimeFormat(
        i18n.language,
        options,
    ).format(new Date(value));
}