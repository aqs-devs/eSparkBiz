// Why this test is deliberately small

// InputField has exactly one responsibility:

// TanStack field
//       ↓
// HTML input props

// So we're testing exactly that mapping.

// We are not testing:

// Zod validation
// i18n
// Field
// FieldLabel
// FieldError
// API calls
// form submission

// Those belong to other tests.

import { render, screen } from '@testing-library/react';
import { useForm } from '@tanstack/react-form';
import { getFormFieldDefinition } from '@job-applicants/shared';
import { expect, test } from 'vitest';

import { InputField } from './InputField';

function TestInputField({
    isInvalid = false,
    ariaDescribedBy,
}: {
    isInvalid?: boolean;
    ariaDescribedBy?: string;
}) {
    const form = useForm({
        defaultValues: {
            firstName: '',
        },
    });

    const fieldDefinition = getFormFieldDefinition('firstName');

    return (
        <form.Field name="firstName">
            {(field) => (
                <InputField
                    fieldDefinition={fieldDefinition}
                    field={field}
                    isInvalid={isInvalid}
                    ariaDescribedBy={ariaDescribedBy}
                />
            )}
        </form.Field>
    );
}

test('renders the input from its field definition', () => {
    render(<TestInputField />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('id', 'firstName');
    expect(input).toHaveAttribute('name', 'firstName');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'John');
});

test('marks the input as valid when there is no validation error', () => {
    render(<TestInputField />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
});

test('marks the input as invalid and references the error message', () => {
    render(
        <TestInputField
            isInvalid
            ariaDescribedBy="firstName-error"
        />,
    );

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute(
        'aria-describedby',
        'firstName-error',
    );
});
