import express from "express";
import {
  createDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import { authUser } from "../../../middleware/auth.js";

const router = express.Router();

// create a department
router.post("/add-department", createDepartment);

// get department
router.get("/get-all-department", getDepartments);

// get a department
router.get("/get-department/:id", getDepartment);

// update a department
router.put(
  "/edit-department/:id",
  updateDepartment
);

// delete a department
router.delete(
  "/delete-department/:id",
  deleteDepartment
);

export default router;
