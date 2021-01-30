export declare interface Config {
  env: string;
  port: string | number;
  jwt: {
    url: string;
  };
  database: {
    host: string;
    username: string;
    password: string;
    database: string;
    dialect: string;
  };
}
