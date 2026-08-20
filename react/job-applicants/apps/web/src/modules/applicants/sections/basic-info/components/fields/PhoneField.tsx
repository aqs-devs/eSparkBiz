import type { AnyFieldApi } from "@tanstack/react-form";
import { PhoneInput } from "./PhoneInput";

export function PhoneField({
    field,
    fieldDefinition: _fieldDefinition,
}: {
    field: AnyFieldApi;
    fieldDefinition?: unknown;
}) {
    return (
        <PhoneInput
            defaultCountry="IN"
            value={field.state.value}
            onChange={(value) => field.handleChange(value ?? "")}
        />
    );
}