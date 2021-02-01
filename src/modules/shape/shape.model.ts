import { hashSync } from "bcryptjs";
import { DataTypes } from "sequelize";

import { TimestampsModel } from "../../common/classes/timestamps-model";
import { defaultScope, scopes } from "./shape.scopes";
import { timestamps } from "../../common/constants/timestamps.constant";

export default class Shape extends TimestampsModel {
  public id!: number;
  public shape: string;
  public result: string;
}

export const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  shape: {
    type: DataTypes.ENUM("RECTANGLE", "SQUARE", "CIRCLE", "TRIANGLE"),
    allowNull: false
  },
  result: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
};

export const init = (sequelize): void => {
  Shape.init(attributes, {
    sequelize,
    tableName: "shapes",
    defaultScope,
    scopes,
    ...timestamps
  });
};
