import express from "express";
import {
  createParcle,
  getParcle,
  updateParcle,
  deleteParcle,
} from "../controllers/parcelController.js";

const router = express.Router();

// create a parcel
router.post("/add-parcel", createParcle);

// get parcels
router.get("/get-all-parcel", getParcle);

// update a parcel
router.put("/edit-parcle/:id", updateParcle);

// delete a parcle
router.delete("/delete-parcle/:id", deleteParcle);

export default router;
