import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@job-applicants/ui/components/select';
import type { Option, SelectFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';
import React from 'react';
import { useTranslation } from 'react-i18next';

type SelectFieldProps = {
    fieldDefinition: SelectFieldDefinition;
    field: AnyFieldApi;
    options?: readonly Option[];
};

export const SelectField = React.memo(function SelectField({
    fieldDefinition,
    field,
    options,
}: SelectFieldProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');

    const selectOptions =
    options?.length
        ? options
        : fieldDefinition.fieldProps?.options ?? [];

    return (
        <Select
            value={field.state.value || undefined} //always pass a defined value.
            onValueChange={(value) => {
                field.handleChange(value);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder={t('actions.select')} />
            </SelectTrigger>

            <SelectContent>
                {selectOptions.map((option) => {
                    const label = option.label ?? tBasicInfo(`options.${fieldDefinition.key}.${option.value}`, { defaultValue: option.value });

                    return (
                        <SelectItem key={option.value} value={option.value}>
                            {label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
});
