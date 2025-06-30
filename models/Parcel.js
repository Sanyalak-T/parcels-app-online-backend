import { Schema, model } from "mongoose";

const ParcelSchema = new Schema({
  arrivalDate: { type: Date, default: Date.now },
  numberOrCode: { type: String },
  parcelType: {
    type: String,
    required: true,
    enum: ["material type", "equipment type"],
    default: "material type",
  },
  parcelName: { type: String, required: true },
  brandTypeModelSizeDescrip: { type: String },
  unitPrice: { type: Number },
  howToGet: { type: String },
  parcelRemark: { type: String },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
  lastlogin: {
    type: Date,
    default: () => new Date(),
  },
});

export const Parcel = model(
  "Parcel",
  ParcelSchema
);
