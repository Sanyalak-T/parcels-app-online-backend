import express from "express";
import {
  createParcel,
  getParcels,
  getParcel,
  updateParcel,
  deleteParcel,
  filterParcel,
} from "../controllers/parcelController.js";

const router = express.Router();

// create a parcel
router.post("/add-parcel", createParcel);

// get parcels
router.get("/get-all-parcel", getParcels);

// get a parcel
router.get("/get-parcel/:id", getParcel);

// update a parcel
router.put("/edit-parcel/:id", updateParcel);

// delete a parcle
router.delete("/delete-parcel/:id", deleteParcel);

// filter parcels
router.get("/filter-parcels", filterParcel);

export default router;
