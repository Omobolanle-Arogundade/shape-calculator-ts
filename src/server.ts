import "reflect-metadata";

import http = require("http");
import dotenv = require("dotenv");
import chalk from "chalk";
import App from "./app";
import { envs } from "../config/envs";

//INIT ENVIRONMENT VARS
dotenv.config();

const APP_PORT = envs.port;

const server = http.createServer(App);

server.listen(APP_PORT);

server.on("listening", (): void => {
  console.log(
    chalk.bgGreen(chalk.black(`API has been started in port ${APP_PORT}!`))
  );
});

server.on("error", (error: NodeJS.ErrnoException): void => {
  console.log(chalk.bgRed(chalk.whiteBright(error.message)));
});
