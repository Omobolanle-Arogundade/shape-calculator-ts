import morgan from "morgan";
import { envs } from "./envs";
import { Logger } from "./logger";

// morgan.token("message", (req, res): string => res.locals.errorMessage || "");

export class MorganLogger extends Logger {
  private static getIpFormat = (): string =>
    envs.env === "production"
      ? ":remote-addr - :remote-user [:date[clf]] - "
      : "";

  private static successResponseFormat = `${MorganLogger.getIpFormat()}:method :url :status - :response-time ms - timestamp :date[clf]`;
  private static errorResponseFormat = `${MorganLogger.getIpFormat()}:method :url :status - :response-time ms - message: :message - timestamp :date[clf]`;

  public successHandler = morgan(MorganLogger.successResponseFormat, {
    skip: (req, res): boolean => res.statusCode >= 400,
    stream: { write: (message): any => this.logger.info(message.trim()) }
  });

  public errorHandler = morgan(MorganLogger.errorResponseFormat, {
    skip: (req, res): boolean => res.statusCode < 400,
    stream: { write: (message): any => this.logger.error(message.trim()) }
  });
}
