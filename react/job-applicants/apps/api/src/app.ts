// app.js becomes:

// 1. connect DB
// 2. initialize middleware
// 3. register routes
// 4. start server

// import 'dotenv/config';
import e, { urlencoded } from 'express';
// import {
//     applicantsRouter,
// } from './modules/applicants/.router.js';
// import { authRouter } from './modules/auth/router.js';
// import { usersRouter } from './modules/users/router.js';
import handleError from './middleware/error-handler.js';
// import { initializeConnection } from '../../../packages/server-core/src/db/mysql2.connector.js';
import { openApiHandler, rpcHandler } from "@job-applicants/server-core";

const app = e();


app.use(urlencoded({ extended: true }));
app.use(e.json()); // React frontend sends JSON request bodies via POST. For oRPC Node adapter, Express must parse JSON before the handler.


app.get('/ping', (req, res) => res.send('pong'))
// app.get('/api-docs.json', (req, res) => res.json(generateOpenApiDocument()));


// app.use("/rpc", (req, res, next) => {
//     // console.log(req.method);
//     // console.log(req.url);
//     // console.log(req.body);
//     next();
// });

// app.use((req, _, next) => {
//     console.log("content-type:", req.headers["content-type"]);
//     console.log("body:", req.body);
//     next();
// });

app.use("/rpc{/*path}", async (req, res, next) => {
    const { matched } = await rpcHandler.handle(req, res, {
        prefix: "/rpc",
        context: {},
    });

    if (matched) {
        return;
    }

    next();
});

app.use("/api{/*path}", async (req, res, next) => {
    const { matched } = await openApiHandler.handle(req, res, {
      prefix: "/api",
      context: {},
    });
  
    if (matched) {
      return;
    }
  
    next();
});

// import { Routes } from '@job-applicants/api-contract';

// app.use('/api' + Routes.applicants.base, applicantsRouter);
// app.use('/api' + Routes.auth.base, authRouter);
// app.use('/api' + Routes.users.base, usersRouter);

app.use(handleError)

try {
    // await initializeConnection();

    const port = Number(process.env["PORT"]) || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
catch (error) {
    console.error(error);
    process.exit(1);
}



// import { generateOpenApiDocument } from './.openapi.js';
// import swaggerUi from 'swagger-ui-express';

// const spec = generateOpenApiDocument();
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));


