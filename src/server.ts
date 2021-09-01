import app from "./app";

const config = require("./config/env.config");

const server = app.listen(config.PORT, () => {
    console.log('The Application is listening on port ', config.PORT)
    console.log("Press CTRL + C to close")
});

export default server;