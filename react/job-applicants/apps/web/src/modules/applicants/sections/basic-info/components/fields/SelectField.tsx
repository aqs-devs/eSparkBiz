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
    isInvalid: boolean;
    ariaDescribedBy?: string;
};

export const SelectField = React.memo(function SelectField({
    fieldDefinition,
    field,
    options,
    isInvalid,
    ariaDescribedBy,
}: SelectFieldProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');

    const selectOptions =
    options?.length
        ? options
        : fieldDefinition.fieldProps?.options ?? [];

    const items = selectOptions.map((option) => ({
        value: option.value,
        label:
            option.label ??
            tBasicInfo(`options.${fieldDefinition.key}.${option.value}`, {
                defaultValue: option.value,
            }),
    }));

    return (
        <Select
            items={items}
            value={field.state.value ?? null}
            onValueChange={(value) => {
                field.handleChange(value);
            }}
        >
            <SelectTrigger
                id={fieldDefinition.key}
                aria-invalid={isInvalid}
                aria-describedby={ariaDescribedBy}
            >
                <SelectValue placeholder={t('actions.select')} />
            </SelectTrigger>

            <SelectContent>
                {items.map((item) => {
                    return (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
});
