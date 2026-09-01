import { defineConfig, devices } from '@playwright/test';

const baseURL =
    process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5173';

export default defineConfig({
    testDir: './tests/e2e',

    use: {
        baseURL,
        ...devices['Desktop Chrome'],
        // Show the browser window
        // headless: false,
    
        // Slow down Playwright actions so you can watch them
        // launchOptions: {
        //   slowMo: 1500,
        // },
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],

    webServer: [
        {
            name: 'web',
            command: 'npm run dev -w web -- --host 0.0.0.0',
            url: baseURL,
            timeout: 180_000,
            reuseExistingServer: true,
        },
        {
            name: 'api',
            command: 'npm run dev -w api',
            // url: 'http://127.0.0.1:3000',
            port: 3000,
            timeout: 30_000,
            reuseExistingServer: true,
            stdout: 'pipe',
            stderr: 'pipe',
        },
    ],
});
