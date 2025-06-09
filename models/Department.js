import { Schema, model } from "mongoose";

const DepartmentSchema = new Schema({
  departmentName: {
    type: String,
    unique: true,
    required: true,
  },
  departmentRemark: { type: String },
  createdOn: {
    type: Date,
    default: new Date().getTime(),
  },
  lastlogin: {
    type: Date,
    default: new Date().getTime(),
  },
});

export const Department = model(
  "Department",
  DepartmentSchema
);
