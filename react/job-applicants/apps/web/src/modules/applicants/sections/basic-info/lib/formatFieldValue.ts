import { formatDate } from '#src/i18n/formatters.ts';

import type { BasicInfo } from '@job-applicants/schemas';
import type { BasicInfoField, Formatter } from '@job-applicants/shared';

function formatByFormatter(formatter: Formatter, value: string): string {
    switch (formatter) {
        case 'date':
            // return new Date(value).toLocaleDateString('en-US', {
            //     day: 'numeric',
            //     month: 'long',
            //     year: 'numeric',
            // });
            return formatDate(value, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        case 'email':
        case 'phone':
            return value;
    }
}

export function formatFieldValue(
    field: BasicInfoField,
    value: BasicInfo[BasicInfoField['key']],
): string {
    if (value == null || value === '') {
        return '—';
    }

    if ('formatter' in field && field.formatter) {
        return formatByFormatter(field.formatter, String(value));
    }

    const options =
        'fieldProps' in field
            ? (field.fieldProps as { options?: readonly { value: string; label?: string }[] } | undefined)?.options
            : undefined;

    if (options) {
        const match = options.find((option) => option.value === value);
        if (match) {
            // Return the explicit label if provided; otherwise return the raw option value.
            // UI components will handle translating the value when needed.
            return match.label ?? match.value;
        }
    }

    return String(value);
}
