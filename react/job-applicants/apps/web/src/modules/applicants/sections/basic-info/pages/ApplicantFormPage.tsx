import { useCallback } from 'react';
import { useSelector } from '@tanstack/react-form';
import { Link, useBlocker } from 'react-router';
import { useTranslation } from 'react-i18next';

import { BasicInfoForm } from '../components/BasicInfoForm';
import { Button, buttonVariants } from '@job-applicants/ui/components/button';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@job-applicants/ui/components/tabs';
import { useBasicInfoForm } from '../hooks/useBasicInfoForm';

type ApplicantFormPageProps = {
    form: ReturnType<typeof useBasicInfoForm>;
    mode: 'create' | 'edit';
    cancelTo: string;
};

export function ApplicantFormPage({
    form,
    mode,
    cancelTo,
}: ApplicantFormPageProps) {
    const { t } = useTranslation('common');
    const { t: tBasicInfo } = useTranslation('basicInfo');

    const isDirty = useSelector(
        form.store,
        (state) => state.isDirty,
    );

    const blocker = useBlocker(
        useCallback(
            ({ currentLocation, nextLocation }) =>
                isDirty &&
                currentLocation.pathname !== nextLocation.pathname,
            [isDirty],
        ),
    );

    const submitLabel =
        mode === 'create'
            ? tBasicInfo('form.createButton')
            : tBasicInfo('form.saveButton');

    return (
        <section className="mx-auto flex max-w-full flex-col gap-6">
            <h1 className="sr-only">{tBasicInfo('title')}</h1>
            <Link
                to={cancelTo}
                className="self-start text-sm text-muted-foreground hover:text-foreground"
            >
                ← {t('actions.backToApplicants')}
            </Link>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void form.handleSubmit(); // handleSubmit() is asynchronous and returns a promise. TanStack's documentation shows the same basic pattern, but its API explicitly treats submission as an async operation.
                }}
            >
                <Tabs defaultValue="basic-info">
                    <TabsList>
                        <TabsTrigger value="basic-info">
                            {t('sections.basicInfo')}
                        </TabsTrigger>

                        <TabsTrigger value="education">
                            {t('sections.education')}
                        </TabsTrigger>

                        <TabsTrigger value="experience">
                            {t('sections.experience')}
                        </TabsTrigger>

                        <TabsTrigger value="technologies">
                            {t('sections.technologies')}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic-info">
                        <BasicInfoForm form={form} />
                    </TabsContent>

                    <TabsContent value="education">
                        {t('sections.education')}
                    </TabsContent>

                    <TabsContent value="experience">
                        {t('sections.experience')}
                    </TabsContent>

                    <TabsContent value="technologies">
                        {t('sections.technologies')}
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-end gap-2">
                    <Link
                        to={cancelTo}
                        className={buttonVariants({ variant: 'outline' })}
                    >
                        {t('actions.cancel')}
                    </Link>

                    <form.Subscribe
                        selector={(state) => state.isSubmitting}
                    >
                        {(isSubmitting) => (
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? t('status.saving')
                                    : submitLabel}
                            </Button>
                        )}
                    </form.Subscribe>
                </div>
            </form>

            {blocker.state === 'blocked' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="unsaved-changes-title"
                        className="w-full max-w-md rounded-lg bg-background p-6 shadow-lg"
                    >
                        <h2
                            id="unsaved-changes-title"
                            className="text-lg font-semibold"
                        >
                            {t('messages.unsavedChanges.title')}
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {t('messages.unsavedChanges.description')}
                        </p>

                        <div className="mt-6 flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => blocker.reset()}
                            >
                                {t('actions.stay')}
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => blocker.proceed()}
                            >
                                {t('actions.leave')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
