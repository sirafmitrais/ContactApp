import express from "express";

import {
    IndexRouter,
    UserRouter,
    AuthRouter,
    ContactRouter
} from "./routes";


import {loggerMiddleware} from "./common/middleware/logger.middleware";
// Create Express server
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.set('view engine', 'pug');

app.use(loggerMiddleware);
app.use('/', IndexRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/contact', ContactRouter);




export default app;