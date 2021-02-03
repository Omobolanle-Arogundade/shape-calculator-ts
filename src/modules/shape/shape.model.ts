import { DataTypes } from "sequelize";

import { TimestampsModel } from "../../common/classes/timestamps-model";
import { defaultScope, scopes } from "./shape.scopes";
import { timestamps } from "../../common/constants/timestamps.constant";
import { shapes } from "../../common/constants/shapes.contants";

export default class Shape extends TimestampsModel {
  public id!: number;
  public shape: string;
  public area: number;
}

export const attributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  uid: {
    type: DataTypes.INTEGER,
    references: {
      tableName: "users",
      key: "id"
    }
  },
  shape: {
    type: DataTypes.ENUM(
      shapes.TRIANGLE,
      shapes.RECTANGLE,
      shapes.SQUARE,
      shapes.CIRCLE
    ),
    allowNull: false
  },
  area: {
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
