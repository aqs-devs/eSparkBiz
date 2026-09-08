import { render, screen } from '@testing-library/react';
import { getFormFieldDefinition } from '@job-applicants/shared';
import type { BasicInfoFormValues } from '@job-applicants/schemas';
import { useForm } from '@tanstack/react-form';
import { expect, test } from 'vitest';

import { renderFormField } from './renderField';

function TestRenderFormField({
    fieldKey,
}: {
    fieldKey:
        | 'firstName'
        | 'email'
        | 'phone'
        | 'dob'
        | 'country'
        | 'gender';
}) {
    const defaultValues: BasicInfoFormValues = {
            firstName: '',
            lastName: '',
            designation: '',
            email: '',
            phone: '',
            dob: '',
            country: null,
            state: null,
            city: null,
            gender: 'male',
            zipCode: null,
            relationshipStatus: null,
    };
    const form = useForm({ defaultValues });

    const fieldDefinition = getFormFieldDefinition(fieldKey);

    return (
        <form.Field name={fieldKey}>
            {(field) =>
                renderFormField(fieldDefinition, field, {
                    isInvalid: false,
                })
            }
        </form.Field>
    );
}

test('renders an input for text fields', () => {
    render(<TestRenderFormField fieldKey="firstName" />);

    expect(
        screen.getByRole('textbox'),
    ).toBeInTheDocument();
});

test('renders an input for email fields', () => {
    render(<TestRenderFormField fieldKey="email" />);

    const input = screen.getByRole('textbox');

    expect(input).toHaveAttribute('type', 'email');
});

test('renders a phone input for telephone fields', () => {
    render(<TestRenderFormField fieldKey="phone" />);

    expect(
        screen.getByRole('textbox'),
    ).toBeInTheDocument();
});

test('renders a date picker for date fields', () => {
    render(<TestRenderFormField fieldKey="dob" />);

    expect(
        screen.getByRole('button', {
            name: /select date/i,
        })
    ).toBeInTheDocument();
});

test('renders a select for select fields', () => {
    render(<TestRenderFormField fieldKey="country" />);

    expect(
        screen.getByRole('combobox'),
    ).toBeInTheDocument();
});

test('renders a radio group for radio fields', () => {
    render(<TestRenderFormField fieldKey="gender" />);

    expect(
        screen.getByRole('radiogroup'),
    ).toBeInTheDocument();

    expect(
        screen.getAllByRole('radio'),
    ).toHaveLength(3);
});
