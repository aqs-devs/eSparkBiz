//can be named as `server.ts`

import { RPCHandler } from "@orpc/server/node";
import { onError, ValidationError } from "@orpc/server";
import { appRouter } from "./routes.ts";


export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    
      // if (error.cause instanceof ValidationError) {
      //   console.dir(error.cause.issues, { depth: null });
      // }
      // console.dir(error.data, { depth: null });
    })
  ],
});
