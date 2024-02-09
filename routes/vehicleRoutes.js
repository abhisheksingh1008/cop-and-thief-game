import { Router } from "express";
import {
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  createNewVehicle,
  deleteVehicle,
} from "../controllers/vehicleControllers.js";

const route = Router();

route.get("/", getAllVehicles);
route.post("/", createNewVehicle);
route.get("/:vehicleId", getVehicleById);
route.put("/:vehicleId", updateVehicle);
route.delete("/:vehicleId", deleteVehicle);

export default route;
