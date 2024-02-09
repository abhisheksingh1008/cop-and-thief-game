import { Router } from "express";
import {
  getAllCities,
  getCityById,
  updateCity,
  createNewCity,
  deleteCity,
} from "../controllers/cityControllers.js";

const route = Router();

route.get("/", getAllCities);
route.post("/", createNewCity);
route.get("/:cityId", getCityById);
route.put("/:cityId", updateCity);
route.delete("/:cityId", deleteCity);

export default route;
