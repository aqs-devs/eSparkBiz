import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from '@tanstack/react-form';
import { getFormFieldDefinition } from '@job-applicants/shared';
import { expect, test } from 'vitest';
import { DateField } from './DateField';

function TestDate({ value = '', invalid = false }: { value?: string; invalid?: boolean }) {
    const form = useForm({ defaultValues: { dob: value } });
    const definition = getFormFieldDefinition('dob');
    return <form.Field name="dob">{(field) => <DateField field={field} fieldDefinition={definition} isInvalid={invalid} ariaDescribedBy={invalid ? 'dob-error' : undefined} />}</form.Field>;
}

test('renders a date trigger with the current value', () => {
    const { container } = render(<TestDate value="2000-01-02" />);
    expect(container.querySelector('#dob')).toHaveTextContent('1/2/2000');
});

test('opens the date picker and exposes validation state', () => {
    const { rerender, container } = render(<TestDate />);
    const trigger = container.querySelector('#dob') as HTMLElement;
    fireEvent.click(trigger);
    expect(document.querySelector('[data-slot="calendar"]')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-invalid', 'false');
    rerender(<TestDate invalid />);
    expect(container.querySelector('#dob')).toHaveAttribute('aria-invalid', 'true');
    expect(container.querySelector('#dob')).toHaveAttribute('aria-describedby', 'dob-error');
});
