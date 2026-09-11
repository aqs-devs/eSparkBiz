import { configureOrpcClient } from '@job-applicants/api-client';

const apiUrl = import.meta.env.DEV
    ? () => new URL('/rpc', window.location.origin).toString()
    : import.meta.env.VITE_API_TARGET;

if (!import.meta.env.DEV && !apiUrl) {
    throw new Error('VITE_API_TARGET is required.');
}

configureOrpcClient(apiUrl);
