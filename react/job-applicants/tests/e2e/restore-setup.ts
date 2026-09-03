import { execFileSync } from 'node:child_process';
import { test } from '@playwright/test';

test('prepare restore test database', async () => {
    execFileSync(
        process.env.ComSpec ?? 'cmd.exe',
        [
            '/c',
            'npm run db:seed:test -w api',
        ],
        {
            cwd: process.cwd(),
            stdio: 'inherit',
        },
    );
});
