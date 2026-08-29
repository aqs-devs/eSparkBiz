import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from '@tanstack/react-form';
import { getFormFieldDefinition } from '@job-applicants/shared';
import { expect, test } from 'vitest';
import { RadioField } from './RadioField';

function TestRadio({ invalid = false }: { invalid?: boolean }) {
    const form = useForm({ defaultValues: { gender: '' } });
    const definition = getFormFieldDefinition('gender');
    return <form.Field name="gender">{(field) => <RadioField field={field} fieldDefinition={definition} isInvalid={invalid} ariaDescribedBy={invalid ? 'gender-error' : undefined} />}</form.Field>;
}

test('renders radio options and selecting one checks it', () => {
    render(<TestRadio />);
    const female = screen.getByRole('radio', { name: 'Female' });
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    fireEvent.click(female);
    expect(female).toBeChecked();
});

test('exposes radio validation state', () => {
    const { rerender } = render(<TestRadio />);
    const group = screen.getByRole('radiogroup');
    expect(group).toHaveAttribute('aria-invalid', 'false');
    rerender(<TestRadio invalid />);
    expect(group).toHaveAttribute('aria-invalid', 'true');
    expect(group).toHaveAttribute('aria-describedby', 'gender-error');
});
