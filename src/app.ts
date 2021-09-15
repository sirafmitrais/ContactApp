import express from "express";
import * as cors from 'cors'
import {
    IndexRouter,
    UserRouter,
    AuthRouter,
    ContactRouter,
    CompanyRouter,
    ContactBookRouter
} from "./routes";


import {loggerMiddleware} from "./common/middleware/logger.middleware";
// Create Express server
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors.default())

app.set('view engine', 'pug');

app.use(loggerMiddleware);
app.use('/', IndexRouter);
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/contact', ContactRouter);
app.use('/company', CompanyRouter);
app.use('/contact-book', ContactBookRouter)

export default app;