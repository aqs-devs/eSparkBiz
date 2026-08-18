// export const RouteBuilder = {
//     applicants: {
//         byId(id: number | string) {
//             return Routes.applicants.byId.replace(':id', String(id));
//         },
//     },

//     users: {
//         byId(id: number | string) {
//             return Routes.users.byId.replace(':id', String(id));
//         },
//     },
// };

export const RouteBuilder = {
    applicants: {
        basicInfo: {
            list() {
                return '/applicants/basic-info';
            },

            create() {
                return '/applicants/new';
            },

            detail(id: number | string) {
                return `/applicants/${id}/basic-info`;
            },

            edit(id: number | string) {
                return `/applicants/${id}/edit/basic-info`;
            },
        },

        education: {
            list() {
                return '/applicants/education'; // there will be a page that lists only education records
            },

            detail(id: number | string) {
                return `/applicants/${id}/education`;
            },

            edit(id: number | string) {
                return `/applicants/${id}/edit/education`;
            },
        },

        experience: {
            list() {
                return '/applicants/experience'; // there will be a page that lists only experience records
            },

            detail(id: number | string) {
                return `/applicants/${id}/experience`;
            },

            edit(id: number | string) {
                return `/applicants/${id}/edit/experience`;
            },
        },

        technologies: {
            list() {
                return '/applicants/technology'; // there will be a page that lists only technology records
            },

            detail(id: number | string) {
                return `/applicants/${id}/technology`;
            },

            edit(id: number | string) {
                return `/applicants/${id}/edit/technology`;
            },
        },
    },
};
