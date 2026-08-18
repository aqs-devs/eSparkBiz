import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@job-applicants/ui/components/select';
import type { Option, SelectFieldDefinition } from '@job-applicants/shared';
import type { AnyFieldApi } from '@tanstack/react-form';
import React from 'react';

type SelectFieldProps = {
    fieldDefinition: SelectFieldDefinition;
    field: AnyFieldApi;
    options?: readonly Option[];
    // onClick: any;
};

export const SelectField = React.memo(function SelectField({
    fieldDefinition,
    field,
    options,
}: SelectFieldProps) {
    const selectOptions =
    options?.length
        ? options
        : fieldDefinition.fieldProps?.options ?? [];
    // console.log({
    //     key: fieldDefinition.key,
    //     value: field.state.value,
    //     optionCount: selectOptions.length,
    //     options: options,
    // });
    // useEffect(() => {
    //     console.log('Mounted', fieldDefinition.key);
    // }, []);
    // console.log(
    //     fieldDefinition.key,
    //     JSON.stringify(field.state.value),
    //     typeof field.state.value,
    // );
    // console.log('options', selectOptions);
    // console.log('length', selectOptions.length);
    // console.log('fieldDefinition.fieldProps?.options', fieldDefinition.fieldProps?.options);

    // selectOptions.forEach((option, index) => {
    //     console.log(index, option);
    // });
    return (
        <Select
            value={field.state.value || undefined} //always pass a defined value.
            // value={field.state.value ?? ''} // Base UI generally expects undefined for "no value" rather than ""
            // onValueChange={field.handleChange}
            onValueChange={(value) => {
                // console.log('changed', fieldDefinition.key, value);
                field.handleChange(value);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select..." />
            </SelectTrigger>

            <SelectContent>
                {/* {console.log(selectOptions)} */}
                {/* {selectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))} */}

                {/* <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem> */}

                {/* <SelectItem value="xyz">THIS IS THE NEW FILE</SelectItem> */}
                <>
                    {/* {console.log('mapping')} */}
                    {selectOptions.map((option) => {
                        // console.log('rendering', option);

                        return (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        );
                    })}
                </>
            </SelectContent>
        </Select>
    );
});
