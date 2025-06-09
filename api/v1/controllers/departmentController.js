import { Department } from "../../../models/Department.js";

// create a department
export const createDepartment = async (
  req,
  res
) => {
  const { departmentName, departmentRemark } =
    req.body;

  //const userId = req.user.user._id; // logged-in user's MongoDB _id

  if (!departmentName) {
    return res.status(400).json({
      error: true,
      message: "Department is required",
    });
  }

  try {
    const department = await Department.create({
      departmentName,
      departmentRemark,
      //userId, //Save user as ObjectId reference
    });

    return res.status(201).json({
      error: false,
      department,
      message: "Department Added Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internet Server Error",
      details: err.message,
    });
  }
};

// get departments
export const getDepartments = async (
  req,
  res
) => {
  try {
    const departments = await Department.find();
    res.status(200).json({
      error: false,
      departments,
      message:
        "All departments retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: err.message,
    });
  }
};

// get a department
export const getDepartment = async (req, res) => {
  const id = req.params.id;
  try {
    const department = await Department.findOne({
      _id: id,
    });
    if (!department) {
      return res.status(404).json({
        error: true,
        message: "Department not found",
      });
    }

    return res.json({
      error: false,
      department,
      message:
        "Department retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: err.message,
    });
  }
};

// update a department
export const updateDepartment = async (
  req,
  res
) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const department =
      await Department.findByIdAndUpdate(id, {
        $set: payload,
      });
    res.status(200).json({
      error: false,
      department,
      message: "update department successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: "Failed to update a department",
      details: err.message,
    });
  }
};

// delete a department
export const deleteDepartment = async (
  req,
  res
) => {
  const { id } = req.params;

  try {
    await Department.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to delete a department",
      details: err.message,
    });
  }
};
