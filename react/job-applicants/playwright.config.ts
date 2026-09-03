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
            name: 'setup',
            testMatch: /[\\/]setup\.ts$/,
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            dependencies: ['setup'],
            testIgnore: /(?:delete|restore)-applicant\.spec\.ts/,
        },
        {
            name: 'delete-setup',
            // Delete mutates the shared E2E applicant, so it runs after the
            // normal Chromium suite and resets the database before its test.
            testMatch: /[\\/]delete-setup\.ts$/,
            dependencies: ['chromium'],
        },
        {
            name: 'delete',
            testMatch: /delete-applicant\.spec\.ts/,
            dependencies: ['delete-setup'],
        },

        {
            name: 'restore-setup',
            testMatch: /[\\/]restore-setup\.ts$/,
            dependencies: ['delete'],
        },
        {
            name: 'restore',
            testMatch: /restore-applicant\.spec\.ts/,
            dependencies: ['restore-setup'],
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
            command: 'npm run dev:test -w api',
            // url: 'http://127.0.0.1:3000',
            port: 3000,
            timeout: 30_000,
            reuseExistingServer: true,
            stdout: 'pipe',
            stderr: 'pipe',
        },
    ],
});
