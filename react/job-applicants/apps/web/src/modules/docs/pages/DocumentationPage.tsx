import { useEffect, useState } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import type { ReactNode } from 'react';

const apiDocumentationHref =
    `${import.meta.env.VITE_API_TARGET.replace(/\/$/, '')}/api/docs`;

const repositoryUrl = 'https://github.com/aqs-devs/eSparkBiz/tree/main/react/job-applicants';

type RepositoryNode = {
    name: string;
    path?: string;
    href?: string;
    children?: RepositoryNode[];
};

type ScrollspyHeading = { id: string; label: string; level: 2 | 3 };
type ScrollspySection = ScrollspyHeading & { children: ScrollspyHeading[] };

const repositoryTree: RepositoryNode[] = [
    {
        name: 'apps',
        path: 'apps',
        children: [
            { name: 'api', path: 'apps/api' },
            {
                name: 'web',
                path: 'apps/web',
                children: [
                    {
                        name: 'src',
                        path: 'apps/web/src',
                        children: [
                            {
                                name: 'modules',
                                path: 'apps/web/src/modules',
                                children: [
                                    {
                                        name: 'applicants',
                                        path: 'apps/web/src/modules/applicants',
                                        children: [
                                            {
                                                name: 'sections',
                                                path: 'apps/web/src/modules/applicants/sections',
                                                children: [
                                                    { name: 'basic-info', path: 'apps/web/src/modules/applicants/sections/basic-info' },
                                                    { name: 'education', path: 'apps/web/src/modules/applicants/sections/education' },
                                                    { name: 'experience', path: 'apps/web/src/modules/applicants/sections/experience' },
                                                    { name: 'technologies', path: 'apps/web/src/modules/applicants/sections/technologies' },
                                                ],
                                            },
                                        ],
                                    },
                                    { name: 'authentication' },
                                    { name: 'users', path: 'apps/web/src/modules/users' },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'packages',
        path: 'packages',
        children: [
            { name: 'api-client', path: 'packages/api-client' },
            { name: 'api-contract', path: 'packages/api-contract' },
            { name: 'schemas', path: 'packages/schemas' },
            { name: 'server-core', path: 'packages/server-core' },
            { name: 'shared', path: 'packages/shared' },
            { name: 'test-data', path: 'packages/test-data' },
            { name: 'ui', path: 'packages/ui' },
        ],
    },
];

type EvolutionDetail = { content: ReactNode; children?: EvolutionDetail[] };
type EvolutionStage = { title: ReactNode; details: EvolutionDetail[] };

const evolutionStages: EvolutionStage[] = [
    { title: 'Initial implementation: Vanilla JS + HTML', details: [{ content: 'MVC' }, { content: <>Express backend, EJS frontend, raw SQL queries (<code>mysql2</code>)</> }, { content: 'Centralized middleware', children: [{ content: 'centralized error handling' }, { content: <>server-side validation (<code>express-validator</code>)</> }] }, { content: 'REST API' }, { content: 'Git / GitHub' }] },
    { title: 'Frontend — EJS → React', details: [{ content: 'React SPA' }, { content: 'React Router' }, { content: 'Context API' }] },
    { title: <>Developer Experience (<code>TypeScript</code>, <code>Zod</code>, <code>Kysely</code> ORM)</>, details: [{ content: 'automatic schema generation' }, { content: 'single source of truth' }, { content: 'type safety' }] },
    { title: <>Styling (<code>CSS</code> to <code>Tailwind</code>)</>, details: [] },
    { title: <>UI components (<code>shadcn/ui</code>)</>, details: [{ content: 'responsive' }, { content: 'dark mode' }, { content: 'accessibility' }] },
    { title: 'Data-heavy applicant list', details: [{ content: <>data table (<code>TanStack Table</code>) — server-side pagination, sorting & filtering</> }, { content: <>URL-based state management (<code>nuqs</code>)</> }] },
    { title: 'Architecture — Monolith → Monorepo', details: [{ content: 'npm workspaces' }, { content: 'shared packages' }] },
    { title: 'API documentation and testing — manual (archived)', details: [{ content: 'OpenAPI contracts' }, { content: 'Postman' }] },
    { title: 'API architecture — REST → oRPC', details: [{ content: 'Contract-First API' }, { content: <>Automated <code>OpenAPI</code> specification and <code>Swagger</code> UI</> }, { content: <><code>REST</code> and RPC endpoints</> }, { content: <>Type-safe: TypeScript client types, request input types, response output types</> }] },
    { title: 'Database migrations — Kysely → Drizzle', details: [{ content: 'Kysely initially used for manual migrations' }, { content: 'Drizzle introduced for migration management' }] },
    { title: 'Globalization', details: [{ content: 'Internationalization (i18n)' }, { content: 'Localization (l10n)' }, { content: 'Right-to-left (RTL) support' }, { content: <code>i18next</code> }] },
    { title: <>Testing (<code>React Testing Library</code>)</>, details: [{ content: <>Unit testing (<code>Vitest</code>, <code>jsdom</code>)</> }, { content: <>End-to-end testing (<code>Playwright</code>)</> }, { content: <>Accessibility testing (<code>axe</code>)</> }, { content: <>Generated test/seed data (<code>Faker</code>)</> }] },
];

function EvolutionDetails({ details }: { details: EvolutionDetail[] }) {
    return <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-muted-foreground">{details.map((detail, index) => <li key={index}>{detail.content}{detail.children && <EvolutionDetails details={detail.children} />}</li>)}</ul>;
}

function EvolutionTimeline() {
    return (
        <ol className="mt-4 space-y-1">
            {evolutionStages.map((stage, index) => (
                <li key={`evolution-stage-${index + 1}`} className="relative flex gap-3 pb-4 last:pb-0">
                    {index < evolutionStages.length - 1 && <span aria-hidden="true" className="absolute start-4 top-9 bottom-0 w-px -translate-x-1/2 bg-border" />}
                    <span aria-hidden="true" className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background text-xs font-semibold text-primary">{String(index + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 pt-1">
                        <p className="font-medium leading-6 text-foreground">{stage.title}</p>
                        {stage.details.length > 0 && <EvolutionDetails details={stage.details} />}
                    </div>
                </li>
            ))}
        </ol>
    );
}

function RepositoryTreeNode({ node, depth }: { node: RepositoryNode; depth: number }) {
    const href = node.href ?? (node.path ? `${repositoryUrl}/${node.path}` : undefined);

    return (
        <li>
            <div className="flex min-h-7 items-center whitespace-nowrap rounded-md px-0 text-sm">
                {depth > 0 && <span aria-hidden="true" className="relative block h-7 w-6 shrink-0 after:absolute after:start-0 after:top-1/2 after:w-6 after:border-t after:border-border after:content-['']" />}
                {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded px-1 py-0.5 font-medium text-primary underline-offset-4 hover:bg-muted hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{node.name}/ <ExternalLink aria-hidden="true" className="size-3 shrink-0 opacity-70" /></a> : <span className="px-1 py-0.5 font-medium text-foreground">{node.name}/</span>}
            </div>
            {node.children && (
                <ul className="ms-6 list-none border-s border-border">
                    {node.children.map((child) => <RepositoryTreeNode key={`${node.name}/${child.name}`} node={child} depth={depth + 1} />)}
                </ul>
            )}
        </li>
    );
}

function RepositoryTree() {
    const root: RepositoryNode = { name: 'job-applicants', href: repositoryUrl, children: repositoryTree };
    return <ul aria-label="Repository structure" className="mt-4 list-none overflow-x-auto rounded-lg border bg-muted/20 py-1 font-mono"><RepositoryTreeNode node={root} depth={0} /></ul>;
}

function OnThisPage() {
    const [sections, setSections] = useState<ScrollspySection[]>([]);
    const [activeId, setActiveId] = useState<string>('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>('article h2[id], article h3[id]'));
        const discovered = elements.map((element) => ({
            id: element.id,
            label: element.textContent ?? '',
            level: Number(element.tagName.slice(1)) as 2 | 3,
        }));
        const grouped = discovered.reduce<ScrollspySection[]>((result, heading) => {
            if (heading.level === 2) result.push({ ...heading, children: [] });
            else result[result.length - 1]?.children.push(heading);
            return result;
        }, []);
        setSections(grouped);
        if (elements[0]) setActiveId(elements[0].id);
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]?.target.id) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-96px 0px -60% 0px', threshold: 0 },
        );
        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    const link = (heading: ScrollspyHeading, nested = false) => (
        <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? 'location' : undefined}
            className={`${nested ? 'ps-8 text-sm font-normal text-muted-foreground' : 'ps-4 text-sm font-semibold text-foreground'} -ms-[18px] block border-s-2 border-transparent py-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:border-primary aria-[current=location]:font-semibold aria-[current=location]:text-foreground`}
            onClick={() => setOpen(false)}
        >
            {heading.label}
        </a>
    );

    const links = (
        <ul className="space-y-2 border-s-2 border-border ps-4">
            {sections.map((section) => (
                <li key={section.id}>
                    {link(section)}
                    {section.children.length > 0 && <ul className="mt-1 space-y-0.5">{section.children.map((heading) => <li key={heading.id}>{link(heading, true)}</li>)}</ul>}
                </li>
            ))}
        </ul>
    );

    return (
        <nav aria-label="On this page" className="lg:sticky lg:top-24">
            <button type="button" className="flex w-full items-center justify-between rounded-md border bg-card px-4 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
                On this page
                <span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            <div className={`${open ? 'mt-3 block' : 'hidden'} lg:block`}>
                <p className="mb-3 text-sm font-semibold text-foreground">On this page</p>
                {links}
            </div>
        </nav>
    );
}

export default function DocumentationPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <header className="border-b pb-10">
                    <p className="mb-3 text-sm font-medium text-primary">Project documentation</p>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Aqueous</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">A data storage for people applying to job portals.</p>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
                        <a className="rounded-md bg-primary px-4 py-2 text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="/applicants">Live App</a>
                        <a className="rounded-md border px-4 py-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href="#repository-structure">GitHub</a>
                        <a className="rounded-md border px-4 py-2 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" href={apiDocumentationHref}>API Documentation</a>
                    </div>
                </header>

                <nav aria-label="Breadcrumb" className="py-6 text-sm text-muted-foreground">
                    <ol className="flex flex-wrap items-center gap-2">
                        <li><a href="/" className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Home</a></li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" className="text-foreground">Documentation</li>
                    </ol>
                </nav>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
                    <div className="lg:col-start-2 lg:row-start-1">
                        <OnThisPage />
                    </div>
                    <article className="min-w-0 max-w-3xl space-y-14 leading-7 lg:col-start-1 lg:row-start-1">
                        <section className="scroll-mt-24">
                            <h2 id="aqueous" className="text-3xl font-semibold tracking-tight">Aqueous</h2>
                            <p className="mt-4">Create account in Aqueous.</p>
                            <p>Then sign in to company-specific job portals using Aqueous. You'll save time not having to register again.</p>
                        </section>
                        <section className="scroll-mt-24">
                            <h2 id="the-application" className="text-2xl font-semibold tracking-tight">The App</h2>
                            <h3 id="deployment" className="mt-8 text-xl font-semibold">Deployment</h3>
                            <div className="mt-3 text-muted-foreground">
                                <p>This deployment is configured for direct access to the main application.</p>
                                <p>Authentication and authorization are not enforced in the demo deployment, allowing the applicant management interface to be explored directly.</p>
                            </div>
                            <h3 id="user-interface" className="mt-8 text-xl font-semibold">User Interface</h3>
                            <ul className="mt-3 list-disc space-y-1 ps-5 text-muted-foreground">
                                <li>Responsive layout</li>
                                <li>Light and dark themes</li>
                                <li>Accessible form controls and navigation</li>
                                <li>Applicant list with pagination, sorting, and filtering</li>
                                <li>Applicant detail and editing views</li>
                                <li>Reusable UI components</li>
                            </ul>
                        </section>
                        <section className="scroll-mt-24">
                            <h2 id="the-code" className="text-2xl font-semibold tracking-tight">The Code</h2>
                            <h3 id="code-policy" className="mt-8 text-xl font-semibold">Code Policy</h3>
                            <h4 className="mt-6 text-lg font-semibold">Separation of Concerns</h4>
                            <ul className="mt-2 list-disc space-y-1 ps-5 text-muted-foreground"><li>Especially separating data and code: contract-first.</li><li>Feature-oriented architecture through the directory structure.</li></ul>
                            <h4 className="mt-6 text-lg font-semibold">Single Source of Truth</h4>
                            <ul className="mt-2 list-disc space-y-1 ps-5 text-muted-foreground"><li>Reduce management: updating once updates everywhere.</li><li>Make code more refactorable.</li></ul>
                            <h4 className="mt-6 text-lg font-semibold">Automation</h4>
                            <ul className="mt-2 list-disc space-y-1 ps-5 text-muted-foreground"><li>Prefer automation over manually updating, generating, and synchronizing things.</li><li>Reduce human intervention.</li></ul>
                            <h4 className="mt-6 text-lg font-semibold">Modularity &amp; Abstraction</h4>
                            <ul className="mt-2 list-disc space-y-1 ps-5 text-muted-foreground"><li>If something is used in many places, create a package for it.</li></ul>
                            <h4 className="mt-6 text-lg font-semibold">Extraction</h4>
                            <ul className="mt-2 list-disc space-y-1 ps-5 text-muted-foreground"><li>Extract mechanisms rather than duplicating them.</li><li>This forms an opinionated layer.</li></ul>
                            <h4 className="mt-6 text-lg font-semibold">Readability</h4>
                            <ul className="mt-2 list-disc space-y-1 ps-5 text-muted-foreground"><li>Use domain/business jargon rather than technology or implementation jargon. Know the customer/stakeholder.</li><li>Use self-explanatory function and variable names.</li><li>Use comments for “why”, not “what”.</li></ul>
                            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                                <h3 id="repository-structure" className="text-xl font-semibold">Repository Structure</h3>
                                <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-primary underline-offset-4 hover:bg-muted hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                    View on GitHub <ExternalLink aria-hidden="true" className="size-3.5" />
                                </a>
                            </div>
                            <RepositoryTree />
                            <h3 id="known-limitations" className="mt-8 text-xl font-semibold">Known Limitations</h3>
                            <div className="mt-4 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
                                <Info aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
                                <ul className="list-disc space-y-2 ps-5 text-muted-foreground">
                                    <li>Only Basic Info is currently implemented; infrastructure exists for other applicant sections.</li>
                                    <li>Authentication and authorization are not implemented.</li>
                                    <li>Applicant profile sections beyond Basic Info are incomplete.</li>
                                    <li>The application is intended as a demonstration/project rather than production hiring platform.</li>
                                    <li>Currently focused on the recruiter and applicant data-management workflow.</li>
                                </ul>
                            </div>
                        </section>
                        <section className="scroll-mt-24">
                            <h2 id="case-study" className="text-2xl font-semibold tracking-tight">Case Study</h2>
                            <h3 id="evolution" className="mt-8 text-xl font-semibold">Evolution</h3>
                            <EvolutionTimeline />
                        </section>
                    </article>
                </div>
            </div>
        </main>
    );
}
