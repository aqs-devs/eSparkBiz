import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from '@tanstack/react-form';
import { getFormFieldDefinition } from '@job-applicants/shared';
import { expect, test } from 'vitest';

import { FormField } from './FormField';

function TestFormField() {
    const form = useForm({
        defaultValues: {
            firstName: '',
        },
    });

    const fieldDefinition = getFormFieldDefinition('firstName');

    return (
        <form.Field
            name="firstName"
            validators={{
                onChange: ({ value }) =>
                    value ? undefined : 'First name is required',
            }}
        >
            {(field) => (
                <FormField
                    fieldDefinition={fieldDefinition}
                    field={field}
                />
            )}
        </form.Field>
    );
}

test('renders a labelled input', () => {
    render(<TestFormField />);

    const input = screen.getByRole('textbox', {
        name: 'First Name',
    });

    expect(input).toBeInTheDocument();
});

test('renders validation state', async () => {
    render(<TestFormField />);

    const input = screen.getByRole('textbox', {
        name: 'First Name',
    });

    expect(input).toHaveAttribute('aria-invalid', 'false');

    fireEvent.change(input, {
        target: { value: 'John' },
    });

    fireEvent.change(input, {
        target: { value: '' },
    });

    await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    expect(input).toHaveAttribute(
        'aria-describedby',
        'firstName-error',
    );

    const error = await screen.findByRole('alert');

    expect(error).toHaveAttribute(
        'id',
        'firstName-error',
    );

    expect(error).toHaveTextContent(
        'First name is required',
    );
});

test('clears the validation state when the input becomes valid', async () => {
    render(<TestFormField />);

    const input = screen.getByRole('textbox', {
        name: 'First Name',
    });

    // First make the field invalid.
    fireEvent.change(input, {
        target: { value: 'John' },
    });

    fireEvent.change(input, {
        target: { value: '' },
    });

    await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    expect(screen.getByRole('alert')).toHaveTextContent(
        'First name is required',
    );

    // Now correct the invalid value.
    fireEvent.change(input, {
        target: { value: 'John' },
    });

    await waitFor(() => {
        expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    expect(input).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('does not expose validation state before the field is touched', () => {
    render(<TestFormField />);

    const input = screen.getByRole('textbox', {
        name: 'First Name',
    });

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});