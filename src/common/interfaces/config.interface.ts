export declare interface Config {
  env: string;
  port: string | number;
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
  };
  database: {
    host: string;
    username: string;
    password: string;
    database: string;
    dialect: string;
  };
}
