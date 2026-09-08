import { OpenAPIHandler } from "@orpc/openapi/node";
import { 
    ORPCError,
    // isORPCError,
    ValidationError, 
    onError 
} from "@orpc/server";

import { appRouter } from "./routes.ts";

// export const openApiHandler = new OpenAPIHandler(appRouter, {
//   interceptors: [
//     onError((error) => {
//         if (!(error instanceof ORPCError)) {
//             return;
//         }

//         console.error(error);

//         if (error.cause instanceof ValidationError) {
//             console.dir(error.cause.issues, { depth: null });
//         }
//     })
//   ],
// });


import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";

export const openApiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [
        new ZodToJsonSchemaConverter(),
      ],

      docsProvider: "scalar",

      docsPath: "/docs",

      specPath: "/openapi.json",

      specGenerateOptions: {
        info: {
          title: "Job Applicants API",
          version: "1.0.0",
        },
      },
    }),
  ],

  interceptors: [
    onError((error) => {
      if (!(error instanceof ORPCError)) {
        return;
      }

      console.error(error);

      if (error.cause instanceof ValidationError) {
        console.dir(error.cause.issues, { depth: null });
      }
    }),
  ],
});
