import { Schema, model } from "mongoose";

const OrganizationSchema = new Schema({
  higherSection: { type: String, required: true },
  organizationName: { type: String, unique: true, require: true },
  departmentName: { type: String, required: true },
  orgRemark: { type: String },
  createdOn: { type: Date, default: new Date().getTime() },
  lastlogin: { type: Date, default: new Date().getTime() },
});

export const Organization = model("Organization", OrganizationSchema);
