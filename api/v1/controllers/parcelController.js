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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search =
      req.query.search ||
      req.query.parcelName ||
      ""; //คำค้นหา

    const query = {};

    if (search) {
      query.$or = [
        {
          parcelName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const totalItems =
      await Parcel.countDocuments(query);

    const parcels = await Parcel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdOn: -1 });
    res.status(200).json({
      error: false,
      parcels,
      pagination: {
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
        limit,
      },
      message: "parels retrieved successfully",
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

  const dataToUpdate = { ...payload }; // สร้าง copy เพื่อไม่ให้แก้ไข req.body โดยตรง

  // ตรวจสอบ parcelType:
  // Mongoose Schema ของคุณเป็น `type: String` แต่ payload ส่งมาเป็น `[ 'equipment type' ]` (Array)
  // คุณต้องแปลงให้เป็น String ก่อน
  if (Array.isArray(dataToUpdate.parcelType)) {
    dataToUpdate.parcelType =
      dataToUpdate.parcelType[0]; // เลือกค่าแรก
  }

  try {
    // ทำการอัปเดต Parcel ใน MongoDB
    const parcel = await Parcel.findByIdAndUpdate(
      id,
      { $set: dataToUpdate }, // ใช้ updateData ที่มี arrivalDate เป็น Date object
      { new: true, runValidators: true } // เพิ่ม options: new: true จะคืนค่า document ที่อัปเดตแล้ว, runValidators: true จะรัน validation ที่กำหนดใน schema
    );
    res.status(200).json({
      error: false,
      parcel,
      message: "update a parcel successfully",
    });
  } catch (err) {
    console.error(
      "Failed to update a parcel:",
      err
    );
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
  const {
    parcelType,
    parcelName,
    arrivalDate,
    page = 1,
    limit = 2,
  } = req.query;

  let query = {};
  if (parcelType)
    query.parcelType = { $in: [parcelType] }; // เพราะ parcelType เป็น array
  if (parcelName)
    query.parcelName = {
      $regex: parcelName
        .trim()
        .replace(/\s+/g, "\\s+"),
      $options: "i",
    };
  if (arrivalDate) {
    const dateStart = new Date(arrivalDate);
    const dateEnd = new Date(arrivalDate);
    dateEnd.setHours(23, 59, 59, 999);
    query.arrivalDate = {
      $gte: dateStart,
      $lte: dateEnd,
    };
  }

  const skip = (page - 1) * limit;
  const total = await Parcel.countDocuments(
    query
  );

  // console.log(
  //   "QUERY:",
  //   JSON.stringify(query, null, 2)
  // );

  try {
    const parcels = await Parcel.find(query)
      .skip(skip)
      .limit(Number(limit));
    res.status(200).json({
      error: false,
      data: parcels,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
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
