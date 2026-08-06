import type { BasicInfo } from '@job-applicants/schemas';
import type { BasicInfoField, Formatter } from '@job-applicants/shared';

function formatByFormatter(formatter: Formatter, value: string): string {
    switch (formatter) {
        case 'date':
            return new Date(value).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
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
        'fieldProps' in field && field.fieldProps && 'options' in field.fieldProps
            ? field.fieldProps.options
            : undefined;

    if (options) {
        const match = options.find((option) => option.value === value);
        if (match) {
            return match.label;
        }
    }

    return String(value);
}
