import { Outlet } from 'react-router';

const ApplicantsLayoutPage = () => {
    return (
        <>
            <div className="min-h-screen bg-background text-foreground">

                <main className="mx-auto max-w-7xl px-6 py-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default ApplicantsLayoutPage;
