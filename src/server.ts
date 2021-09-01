import app from "./app";

import { configApp } from "./config/env.config";
const server = app.listen(configApp.PORT, () => {
    console.log('The Application is listening on port ', configApp.PORT)
    console.log("Press CTRL + C to close")
});

export default server;