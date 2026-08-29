import { useState } from 'react';

import { CalendarIcon } from 'lucide-react';

import { Button } from '@job-applicants/ui/components/button';
import { Calendar } from '@job-applicants/ui/components/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@job-applicants/ui/components/popover';

import { cn } from '@job-applicants/ui/utils';

import type { DateFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';

import {
    formatDateForInput,
    parseDate
} from '@job-applicants/shared'
import { formatDate } from '#src/i18n/formatters.ts';
import { useTranslation } from 'react-i18next';

type DateFieldOptions = {
    fieldDefinition: DateFieldDefinition;
    field: AnyFieldApi;
    isInvalid: boolean;
    ariaDescribedBy?: string;
};

export function DateField({
    fieldDefinition,
    field,
    isInvalid,
    ariaDescribedBy,
}: DateFieldOptions) {
    const [open, setOpen] = useState(false);

    const value = parseDate(field.state.value);

    const { min, max } = fieldDefinition.fieldProps ?? {};

    // console.log(fieldDefinition.fieldProps?.max);
    const { t } = useTranslation('common');

    return (
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
            render={
                <Button
                    type="button"
                    variant="outline"
                    id={fieldDefinition.key}
                    aria-invalid={isInvalid}
                    aria-describedby={ariaDescribedBy}
                    className={cn(
                        'w-full justify-between text-start font-normal',
                        !value && 'text-muted-foreground',
                    )}
                />
            }
        >
            {value
                ? formatDate(value)
                : t('actions.selectDate')}

            <CalendarIcon className="h-4 w-4 opacity-50" />
        </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={value}
                    disabled={(date) => {
                        const minDate = min ? parseDate(min) : undefined;
                        const maxDate = max ? parseDate(max) : undefined;

                        if (minDate && date < minDate) return true;
                        if (maxDate && date > maxDate) return true;

                        return false;
                    }}
                    onSelect={(date) => {
                        field.handleChange(formatDateForInput(date));
                        setOpen(false);
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
