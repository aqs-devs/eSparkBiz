import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5173';

export default defineConfig({
    testDir: './tests/e2e',
    use: {
        baseURL,
        ...devices['Desktop Chrome'],
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        command: 'npm run dev -w web -- --host 0.0.0.0',
        timeout: 180_000,
        env: {
            VITE_API_TARGET: process.env.VITE_API_TARGET ?? 'http://localhost:3000',
        },
        url: baseURL,
        reuseExistingServer: true,
    },
});
