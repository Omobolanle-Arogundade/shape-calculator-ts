import chalk from "chalk";
import {
  ValidationErrorItem,
  ValidationError,
  UniqueConstraintError
} from "sequelize";

import { HTTP } from "../constants/http.constant";
import { ResponseError } from "../interfaces/response-error.interface";
import { ResponseErrors } from "../interfaces/response-errors.interface";
import { ErrorDetail } from "../interfaces/error-detail.interface";
import logger from "../../../config/logger";

export abstract class ErrorHandler {
  /**
   * @param error
   *
   */
  public handleUnknownError(
    error: Error
  ): { errorData: ResponseError; statusCode: number } {
    logger.error(chalk.bgRed(chalk.whiteBright("UNKNOWN ERROR: ")), error);

    return {
      errorData: {
        code: HTTP.INTERNAL_SERVER_ERROR,
        message: error.message
      },
      statusCode: HTTP.INTERNAL_SERVER_ERROR
    };
  }

  /**
   * @param error
   */
  public handleValidationError(
    error: ValidationError
  ): { errorData: ResponseErrors; statusCode: number } {
    const errors: ErrorDetail[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem): void => {
      errors.push({
        type: "invalid",
        field: errorItem.path,
        message: `Field ${errorItem.path} is invalid.`
      });
    });

    return {
      errorData: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  }

  /**
   * @param error
   */
  public handleUniqueConstraintError(
    error: UniqueConstraintError
  ): { errorData: ResponseErrors; statusCode: number } {
    const errors: ErrorDetail[] = [];

    error.errors.forEach((errorItem: ValidationErrorItem): void => {
      errors.push({
        type: "duplicated",
        field: errorItem.path,
        message: `Field ${errorItem.path} should be unique.`
      });
    });

    return {
      errorData: {
        errors
      },
      statusCode: HTTP.UNPROCESSABLE_ENTITY
    };
  }
}
