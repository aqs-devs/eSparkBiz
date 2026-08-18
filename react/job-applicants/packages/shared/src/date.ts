export function parseDate(value?: string) {
    return value ? new Date(value) : undefined;
}

export function formatDateForInput(date?: Date) {
    return date
        ? date.toISOString().slice(0, 10)
        : '';
}

export function today() {
    const date = new Date();

    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    return date.toISOString().slice(0, 10);
}