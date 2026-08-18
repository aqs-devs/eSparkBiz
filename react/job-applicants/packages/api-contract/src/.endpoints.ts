// export const Contract = {
//   applicants: {
//     list: {
//       method: "GET",
//       path: "/applicants",

//       responses: {
//         200: ApplicantListSchema,
//       },
//     },

//     create: {
//       method: "POST",
//       path: "/applicants",

//       body: CreateApplicantSchema,

//       responses: {
//         201: ApplicantSchema,
//       },
//     },

//     get: {
//       method: "GET",
//       path: "/applicants/:id",
//     },

//     update: {
//       method: "PATCH",
//       path: "/applicants/:id",
//     },

//     delete: {
//       method: "DELETE",
//       path: "/applicants/:id",
//     },

//     filterOptions: {
//       method: "GET",
//       path: "/applicants/filter-options",
//     },
//   },
// } as const;

export const ApiEndpoints = {
    applicants: {
        base: '/applicants',
        filterOptions: '/applicants/filter-options',
        byId: '/applicants/{id}',
    },

    auth: {
        base: '/auth',
        login: '/auth/login',
        logout: '/auth/logout',
        signup: '/auth/signup',
    },

    users: {
        base: '/users',
        byId: '/users/{id}',
    },
} as const;


