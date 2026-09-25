// I (chatgpt) would not register every error on every endpoint.

// For example:

// show
//  - NOT_FOUND
// create
//  - CONFLICT
// authenticated endpoints
//  - UNAUTHORIZED
//  - FORBIDDEN

// This makes the contract accurately describe each endpoint and gives the client better TypeScript narrowing. Registering all errors everywhere is easier, but it weakens the value of the contract because every endpoint appears to throw every error.

import { oc } from "@orpc/contract";

import {
  BasicInfoSchema,
  CreateBasicInfoSchema,
  BasicInfoListQuerySchema,
  BasicInfoListResponseSchema,
  BasicInfoFilterOptionsSchema,
  UpdateBasicInfoInputSchema,
  IdParamsSchema,
} from "@job-applicants/schemas";

// // Selective re-exports of schemas specifically involved in HTTP API contracts
// export {
//   IdSchema,
//   BasicInfoSchema,
//   CreateBasicInfoSchema,
//   BasicInfoListQuerySchema,
//   BasicInfoListResponseSchema,
//   BasicInfoFilterOptionsSchema,
//   UpdateBasicInfoSchema,
//   UpdateBasicInfoInputSchema,
// };
import { contractErrors } from "../errors.ts";

export const basicInfoContract = oc.router({
  create: oc
    .route({
      method: "POST",
      path: "/applicants",
      description: "...",
      tags: ["Applicants"],
    })
    .errors({
      CONFLICT: contractErrors.CONFLICT,
      VALIDATION_ERROR: contractErrors.VALIDATION_ERROR,
      INTERNAL_SERVER_ERROR: contractErrors.INTERNAL_SERVER_ERROR //after findById(id) returns nothing immediately after insert.
    })
    .input(CreateBasicInfoSchema)
    .output(BasicInfoSchema),

    show: oc
      .route({
        method: "GET",
        path: "/applicants/{id}",
      tags: ["Applicants"],
      })
      .errors({
        NOT_FOUND: contractErrors.NOT_FOUND,
      })
  // show: oc
  //   .route({
  //     method: "POST",
  //     path: "/applicants/show",
  //   })
    .input(IdParamsSchema)
    .output(BasicInfoSchema),

  list: oc
    .route({
      method: "GET",
      path: "/applicants",
      tags: ["Applicants"],
    })
    .input(BasicInfoListQuerySchema)
    .output(BasicInfoListResponseSchema),

  filterOptions: oc
    .route({
      method: "GET",
      path: "/applicants/filter-options",
      tags: ["Applicants"],
    })
    .output(BasicInfoFilterOptionsSchema),

    update: oc
    .route({
        method: "PATCH",
        path: "/applicants/{id}",
        description: "Partially update an applicant's basic information.",
        tags: ["Applicants"],
    })
    .errors({
        NOT_FOUND: contractErrors.NOT_FOUND,
        VALIDATION_ERROR: contractErrors.VALIDATION_ERROR,
    })
    .input(UpdateBasicInfoInputSchema)
    .output(BasicInfoSchema),


delete: oc
    .route({
        method: 'DELETE',
        path: '/applicants/{id}',
        description: 'Soft-delete an applicant.',
        tags: ['Applicants'],
        successStatus: 204,
        // outputStructure: 'detailed', //outputStructure: 'detailed' is intended for a response object containing things such as status, headers, and body. But your client does not need a response body: `await deleteApplicant(applicantId);`
    })
    .errors({
        NOT_FOUND: contractErrors.NOT_FOUND,
    })
    .input(IdParamsSchema),

    restore: oc
    .route({
        method: "POST",
        path: "/applicants/{id}/restore",
        description: "Restore a soft-deleted applicant.",
        tags: ["Applicants"],
    })
    .errors({
        NOT_FOUND: contractErrors.NOT_FOUND,
    })
    .input(IdParamsSchema),
});
