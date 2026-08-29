import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from '@tanstack/react-form';
import { getFormFieldDefinition } from '@job-applicants/shared';
import { expect, test } from 'vitest';
import { PhoneField } from './PhoneField';

function TestPhone({ value = '', invalid = false }: { value?: string; invalid?: boolean }) {
    const form = useForm({ defaultValues: { phone: value } });
    const definition = getFormFieldDefinition('phone');
    return <form.Field name="phone">{(field) => <PhoneField field={field} fieldDefinition={definition} isInvalid={invalid} ariaDescribedBy={invalid ? 'phone-error' : undefined} />}</form.Field>;
}

test('renders a phone textbox with its value and updates the form value', () => {
    render(<TestPhone value="+919876543210" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('+91 98765 43210');
    fireEvent.change(input, { target: { value: '+91 98765 43211' } });
    expect(input).toHaveValue('+91 98765 43211');
});

test('exposes phone validation state and described-by', () => {
    const { rerender } = render(<TestPhone />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
    rerender(<TestPhone invalid />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'phone-error');
});
