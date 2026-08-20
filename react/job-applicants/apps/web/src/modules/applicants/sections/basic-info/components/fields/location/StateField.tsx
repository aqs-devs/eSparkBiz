import { getFormFieldDefinition } from '@job-applicants/shared';
import type { ApplicantForm } from '#src/modules/applicants/sections/basic-info/hooks/useBasicInfoForm';
import { getStateOptions } from '#src/modules/applicants/sections/basic-info/lib/location';
import { FormField } from '../FormField';

type Props = {
    form: ApplicantForm;
};

const stateFieldDefinition = getFormFieldDefinition('state');

export function StateField({ form }: Props) {
    return (
        <form.Subscribe
            selector={(state) => state.values.country}
        >
            {(countryCode) => (
                <form.Field name="state">
                    {(field) => (
                        <FormField
                            fieldDefinition={stateFieldDefinition}
                            field={field}
                            // form={form}
                            options={getStateOptions(countryCode ?? '')}
                        />
                    )}
                </form.Field>
            )}
        </form.Subscribe>
    );
}