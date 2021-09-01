import express from "express";

import {router as indexRouter} from "./routes/index.route";
import {router as userRouter} from "./routes/users.route";
import {router as authRouter} from "./routes/auth.route";
import loggerMiddleware from "./common/middleware/logger.middleware";
// Create Express server
const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(loggerMiddleware);
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);




export default app;