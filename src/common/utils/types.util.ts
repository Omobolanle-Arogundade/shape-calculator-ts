import { DataTypes, DataType } from "sequelize";

export const isNumberType = (type: DataType): boolean =>
  type instanceof DataTypes.NUMBER;

export const isDateType = (type: DataType): boolean =>
  type instanceof DataTypes.DATE;
