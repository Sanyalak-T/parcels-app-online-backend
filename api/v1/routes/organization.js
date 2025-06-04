import express from "express";
import {
  createOrganization,
  getOrganization,
  getOrganizations,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organizationController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

// create a organization
router.post("/auth/add-organization", authUser, createOrganization);

// get organizations
router.get("/get-all-organization", getOrganizations);

// get a organization
router.get("/get-organization/:id", getOrganization);

// update a orgainzation
router.put("/edit-organization/:id", updateOrganization);

// delete a organization
router.delete("/delete-organization/:id", deleteOrganization);

export default router;
