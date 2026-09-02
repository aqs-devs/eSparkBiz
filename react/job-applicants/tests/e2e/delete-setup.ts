import { test as setup } from '@playwright/test';
import { execFileSync } from 'node:child_process';

setup('prepare delete test database', () => {
    const command =
        process.platform === 'win32'
            ? process.env.ComSpec ?? 'cmd.exe'
            : 'npm';
    const args =
        process.platform === 'win32'
            ? ['/d', '/s', '/c', 'npm run db:seed:test -w api']
            : ['run', 'db:seed:test', '-w', 'api'];

    execFileSync(command, args, {
        cwd: process.cwd(),
        stdio: 'inherit',
    });
});
