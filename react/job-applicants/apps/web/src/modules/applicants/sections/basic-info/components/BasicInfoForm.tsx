import {
    formBasicInfoFields,
    type FormBasicInfoField,
} from '@job-applicants/shared';

import { FieldGroup } from '@job-applicants/ui/components/field';
import type { ApplicantForm } from '../hooks/useBasicInfoForm';
import { FormField } from './fields/FormField';
import { CityField } from './fields/location/CityField';
import { CountryField } from './fields/location/CountryField';
import { StateField } from './fields/location/StateField';



type BasicInfoFormProps = {
    form: ApplicantForm;
};

const LOCATION_KEYS = new Set([
    'country',
    'state',
    'city',
]);

export function BasicInfoForm({ form }: BasicInfoFormProps) {
    function createFormField(fieldDefinition: FormBasicInfoField) {
        if (LOCATION_KEYS.has(fieldDefinition.key)) {
            return null;
        }

        return (
            <form.Field
                key={fieldDefinition.key}
                name={fieldDefinition.key}
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

    return (
        <FieldGroup>
            {formBasicInfoFields.map(createFormField)}

            <CountryField form={form} />
            <StateField form={form} />
            <CityField form={form} />
        </FieldGroup>
    );
}