// import { implement } from "@orpc/server";

// import {
//   basicInfoContract,
// } from "@job-applicants/api-contract";

// import * as service from "./service";

// const os = implement(basicInfoContract);
// const os = implement(appContract); //implemented in apps/api/src/orpc.ts

// export const router = os.router({
//   create: os.create.handler(async ({ input }) => {
//     return service.createApplicant(input);
//   }),
// });

import * as service from './service.ts';
import { os } from '../../orpc.builder.ts'; //replaced with `rpc`
import { withAppErrors } from '../../errors/with-app-errors.ts';

// const os = implement(appContract);

export const basicInfoRouter = os.applicants.basicInfo.router({
    create: os.applicants.basicInfo.create.handler(
        withAppErrors(async ({ input }) => {
            return service.createApplicant(input);
        }),
    ),
    show: os.applicants.basicInfo.show.handler(
        withAppErrors(async ({ input }) => {
            return service.getApplicant(input.id);
        }),
    ),
    filterOptions: os.applicants.basicInfo.filterOptions.handler(
        withAppErrors(() => {
            return service.getFilterOptions();
        }),
    ),
    list: os.applicants.basicInfo.list.handler(({ input }) => {
        return service.listPaginatedApplicants(input);
    }),
    update: os.applicants.basicInfo.update.handler(
        withAppErrors(async ({ input }) => {
            return service.updateApplicant(input.id, input.data);
        }),
    ),
    delete: os.applicants.basicInfo.delete.handler(
        withAppErrors(async ({ input }) => {
            return service.deleteApplicant(input.id);
        }),
    ),
    restore: os.applicants.basicInfo.restore.handler(
        async ({ input }) => {
            await service.restoreApplicant(input.id);
        },
    ),
});
