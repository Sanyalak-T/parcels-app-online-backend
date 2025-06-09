import express from "express";
import userRoutes from "./routes/users.js";
import organizationRoutes from "./routes/organization.js";
import parcelRoutes from "./routes/parcel.js";
import departmentRoutes from "./routes/department.js";

export default () => {
  const router = express.Router();
  router.use(userRoutes);
  router.use(organizationRoutes);
  router.use(parcelRoutes);
  router.use(departmentRoutes);
  return router;
};
