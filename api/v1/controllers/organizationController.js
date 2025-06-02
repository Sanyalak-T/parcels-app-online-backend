import { Organization } from "../../../models/Organization.js";

// create a organization
export const createOrganization = async (req, res) => {
  const { higherSection, organizationName, department, parcelType, orgRemark } =
    req.body;

  const userId = req.user.user._id; // logged-in user's MongoDB _id

  if (!higherSection) {
    return res.status(400).json({
      error: true,
      message: "Higher Section is required",
    });
  }

  if (!organizationName) {
    return res.status(400).json({
      error: true,
      message: "Organization Name is required",
    });
  }

  if (!department) {
    return res.status(400).json({
      error: true,
      message: "Department is required",
    });
  }

  try {
    const organization = await Organization.create({
      higherSection,
      organizationName,
      department,
      parcelType,
      orgRemark,
      userId, //Save user as ObjectId reference
    });

    return res.status(201).json({
      error: false,
      organization,
      message: "Organization Added Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internet Server Error",
      details: err.message,
    });
  }
};

// get organizations
export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json({
      error: false,
      organizations,
      message: "All organization retrieved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: err.message,
    });
  }
};

// update a organization
export const updateOrganization = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const organization = await Organization.findByIdAndUpdate(id, {
      $set: payload,
    });
    res.status(200).json({
      error: false,
      organization,
      message: "update organization successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: true,
      message: "Failed to update a user",
      details: err.message,
    });
  }
};

// delete a orgainzation
export const deleteOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    await Organization.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to delete a organization",
      details: err.message,
    });
  }
};
