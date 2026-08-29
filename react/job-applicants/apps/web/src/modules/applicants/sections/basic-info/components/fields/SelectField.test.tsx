import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from '@tanstack/react-form';
import { getFormFieldDefinition } from '@job-applicants/shared';
import { expect, test } from 'vitest';

import { SelectField } from './SelectField';

function TestSelectField({ value = '' , isInvalid = false, ariaDescribedBy }: { value?: string; isInvalid?: boolean; ariaDescribedBy?: string }) {
    const form = useForm({ defaultValues: { relationshipStatus: value } });
    const fieldDefinition = getFormFieldDefinition('relationshipStatus');

    return <form.Field name="relationshipStatus">{(field) => <SelectField fieldDefinition={fieldDefinition} field={field} isInvalid={isInvalid} ariaDescribedBy={ariaDescribedBy} />}</form.Field>;
}

test('renders a select trigger', () => {
    render(<TestSelectField />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('renders the provided options', async () => {
    render(<TestSelectField />);
    fireEvent.click(screen.getByRole('combobox'));
    expect(await screen.findByRole('option', { name: 'Committed' })).toBeInTheDocument();
});

test('updates the field value and displays the translated label when selected', async () => {
    render(<TestSelectField />);
    fireEvent.click(screen.getByRole('combobox'));
    const option = await screen.findByRole('option', { name: 'Committed' });
    fireEvent.pointerDown(option);
    fireEvent.click(option);
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveTextContent('Committed'));
    expect(screen.getByRole('combobox')).not.toHaveTextContent('committed');
});

test('passes the invalid state to the select trigger', () => {
    render(<TestSelectField isInvalid ariaDescribedBy="relationshipStatus-error" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'relationshipStatus-error');
});

test('clears the invalid state when rendered as valid', () => {
    render(<TestSelectField />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false');
});
