import { basicInfoRouter } from "./applicants/basic-info/procedure.ts";

export const appRouter = {
    applicants: {
        basicInfo: basicInfoRouter,
    },

    auth: {},

    users: {},
};
