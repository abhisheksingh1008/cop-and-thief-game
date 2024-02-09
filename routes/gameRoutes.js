import { Router } from "express";
import { findThief, initializeGame } from "../controllers/gameControllers.js";

const route = Router();

route.post("/start", initializeGame);
route.post("/find-thief", findThief);

export default route;
