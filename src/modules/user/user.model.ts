import { hashSync } from "bcryptjs";
import { DataTypes } from "sequelize";

import { TimestampsModel } from "../../common/classes/timestamps-model";
import { defaultScope, scopes } from "./user.scopes";
import { timestamps } from "../../common/constants/timestamps.constant";

export default class User extends TimestampsModel {
  public id!: number;
  public email!: string;
  public name: FunctionStringCallback;
  public password!: string;
}

const hooks = {
  beforeCreate: (user): void => {
    user.password = hashSync(user.password, 10);
  }
};

export const attributes = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
};

export const init = (sequelize): void => {
  User.init(attributes, {
    sequelize,
    tableName: "users",
    defaultScope,
    scopes,
    ...timestamps,
    hooks
  });
};
