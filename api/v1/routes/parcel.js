import express from "express";
import {
  createParcel,
  getParcel,
  updateParcel,
  deleteParcel,
} from "../controllers/parcelController.js";

const router = express.Router();

// create a parcel
router.post("/add-parcel", createParcel);

// get parcels
router.get("/get-all-parcel", getParcel);

// update a parcel
router.put("/edit-parcle/:id", updateParcel);

// delete a parcle
router.delete("/delete-parcle/:id", deleteParcel);

export default router;
