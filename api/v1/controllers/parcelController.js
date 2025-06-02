import { Parcel } from "../../../models/Parcel.js";

// create a parcel
export const createParcle = async (req, res) => {
  const {
    arrivalDate,
    numberOrCode,
    parcelType,
    parcelName,
    brandTypeModelSizeDescrip,
    unitPrice,
    howToGet,
    parcelRemark,
  } = req.body;

  if (!parcelName) {
    return res.status(400).send({
      error: true,
      message: "parcel name is required",
    });
  }

  try {
    const parcel = await Parcel.create({
      arrivalDate,
      numberOrCode,
      parcelType,
      parcelName,
      brandTypeModelSizeDescrip,
      unitPrice,
      howToGet,
      parcelRemark,
    });

    return res.status(201).json({
      error: false,
      parcel,
      message: "Parcle added Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internet Server Error",
      details: err.message,
    });
  }
};

// get parcels
export const getParcle = async (req, res) => {
  try {
    const parcles = await Parcel.find();
    res.status(200).json({
      error: false,
      parcles,
      message: "All parels retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: err.message,
    });
  }
};

// update a parcels
export const updateParcle = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const parcle = await Parcel.findByIdAndUpdate(id, { $set: payload });
    res.status(200).json({
      error: false,
      parcle,
      message: "update a parcel successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Failed to update a parcel",
      details: err.message,
    });
  }
};

// delete a organization
export const deleteParcle = async (req, res) => {
  const { id } = req.params;

  try {
    await Parcel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to delete a parcel",
      details: err.message,
    });
  }
};
