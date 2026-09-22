// app.js becomes:

// 1. connect DB
// 2. initialize middleware
// 3. register routes
// 4. start server

import e, { urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
// import {
//     applicantsRouter,
// } from './modules/applicants/.router.js';
// import { authRouter } from './modules/auth/router.js';
// import { usersRouter } from './modules/users/router.js';
import handleError from './middleware/error-handler.js';
// import { initializeConnection } from '../../../packages/server-core/src/db/mysql2.connector.js';
import { openApiHandler, rpcHandler } from "@job-applicants/server-core";

const app = e();

const webOrigin = process.env['WEB_ORIGIN'];

if (process.env['NODE_ENV'] === 'production' && !webOrigin) {
    throw new Error('WEB_ORIGIN is required in production.');
}

app.use(helmet());

if (process.env['NODE_ENV'] === 'development') {
    app.use(morgan('dev'));
}

// The oRPC Scalar integration renders a CDN script and an inline initializer.
// Keep Helmet's default CSP everywhere else and relax only the docs route.
app.use('/api/docs', (req, res, next) => {
    const contentSecurityPolicy = res.getHeader('Content-Security-Policy');

    if (typeof contentSecurityPolicy === 'string') {
        res.setHeader(
            'Content-Security-Policy',
            contentSecurityPolicy.replace(
                "script-src 'self'",
                "script-src 'self' https://cdn.jsdelivr.net 'unsafe-inline'",
            ).replace(
                "default-src 'self'",
                "default-src 'self';connect-src 'self' https://cdn.jsdelivr.net https://api.scalar.com",
            ),
        );
    }

    next();
});

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || origin === webOrigin) {
                callback(null, true);
                return;
            }

            callback(null, false);
        },
        methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        optionsSuccessStatus: 204,
    }),
);

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

    app.listen(port, "0.0.0.0", () => {
        console.log(`Server running on 0.0.0.0:${port}`);
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

