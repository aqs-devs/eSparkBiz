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

type DateFieldOptions = {
    fieldDefinition: DateFieldDefinition;
    field: AnyFieldApi;
};

export function DateField({ fieldDefinition, field }: DateFieldOptions) {
    const [open, setOpen] = useState(false);

    const value = parseDate(field.state.value);

    const { min, max } = fieldDefinition.fieldProps ?? {};

    // console.log(fieldDefinition.fieldProps?.max);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        'w-full justify-between text-left font-normal',
                        !value && 'text-muted-foreground',
                    )}
                >
                    {value ? value.toLocaleDateString() : 'Select date'}

                    <CalendarIcon className="h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={value}
                    disabled={{
                        before: parseDate(min),
                        after: parseDate(max),
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
