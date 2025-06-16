import { Parcel } from "../../../models/Parcel.js";

// create a parcel
export const createParcel = async (req, res) => {
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

  const dateObj = new Date(arrivalDate);

  if (!parcelName) {
    return res.status(400).send({
      error: true,
      message: "parcel name is required",
    });
  }

  try {
    const parcel = await Parcel.create({
      dateObj,
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
export const getParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.status(200).json({
      error: false,
      parcels,
      message:
        "All parels retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: err.message,
    });
  }
};

// get a parcel
export const getParcel = async (req, res) => {
  const id = req.params.id;
  try {
    const parcel = await Parcel.findOne({
      _id: id,
    });
    if (!parcel) {
      return res.status(404).json({
        error: true,
        message: "Parcel not found",
      });
    }

    return res.json({
      error: false,
      parcel,
      message: "Parcel retrieved successfully",
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
export const updateParcel = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const parcel = await Parcel.findByIdAndUpdate(
      id,
      { $set: payload }
    );
    res.status(200).json({
      error: false,
      parcel,
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
export const deleteParcel = async (req, res) => {
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

// filter parcels by parcel type, parcel name and date
export const filterParcel = async (req, res) => {
  const { parcelType, parcelName, arrivalDate } =
    req.query;
  console.log("xxx", parcelName);

  let query = {};
  if (parcelType) query.parcelType = parcelType;
  if (parcelName)
    query.parcelName = {
      $regex: parcelName
        .trim()
        .replace(/\s+/g, "\\s+"),
      $options: "i",
    };
  if (arrivalDate)
    query.arrivalDate = arrivalDate;

  console.log(
    "QUERY:",
    JSON.stringify(query, null, 2)
  );

  try {
    const parcels = await Parcel.find(query);
    res.status(200).json({
      error: false,
      parcels,
      message: "Parcels retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to filter parcels",
      details: err.message,
    });
  }
};
