import { useEffect, useState } from 'react';
import { getFormFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';
import type { ApplicantForm } from '#src/modules/applicants/sections/basic-info/hooks/useBasicInfoForm';
import { getCityOptions } from '#src/modules/applicants/sections/basic-info/lib/location';
import type { Option } from '#src/modules/applicants/sections/basic-info/lib/location';
import { FormField } from '../FormField';

type Props = {
    form: ApplicantForm;
};

const cityFieldDefinition = getFormFieldDefinition('city');

export function CityField({ form }: Props) {
    return (
        <form.Subscribe
            selector={(state) => ({
                countryCode: state.values.country,
                stateCode: state.values.state,
            })}
        >
            {({ countryCode, stateCode }) => (
                <form.Field name="city">
                    {(field) => (
                        <CityOptionsField
                            field={field}
                            countryCode={countryCode ?? ''}
                            stateCode={stateCode ?? ''}
                        />
                    )}
                </form.Field>
            )}
        </form.Subscribe>
    );
}

function CityOptionsField({
    field,
    countryCode,
    stateCode,
}: {
    field: AnyFieldApi;
    countryCode: string;
    stateCode: string;
}) {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        let cancelled = false;
        getCityOptions(countryCode, stateCode).then((loaded) => {
            if (!cancelled) setOptions(loaded);
        });
        return () => {
            cancelled = true;
        };
    }, [countryCode, stateCode]);

    return <FormField fieldDefinition={cityFieldDefinition} field={field} options={options} />;
}
