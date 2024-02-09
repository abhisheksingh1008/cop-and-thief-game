import { v4 as uuid } from "uuid";
import { getDB, writeToDB } from "../server.js";
import { HttpError } from "../middlewares/errorMiddleware.js";

const getAllVehicles = async (req, res, next) => {
  try {
    const data = getDB();

    res.status(200).json({
      success: true,
      vehicles: data.vehicles,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const getVehicleById = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const data = getDB();
    const vehicle = data.vehicles.find((v) => v.id === vehicleId);

    if (!vehicle) {
      return next(new HttpError("Please provide a valid vehicle id.", 400));
    }

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const updateVehicle = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const { updatedVehicle } = req.body;
    const data = getDB();
    const vehicle = data.vehicles.find((v) => v.id === vehicleId);

    if (!vehicle) {
      return next(new HttpError("Please provide a valid vehicle id.", 400));
    }

    for (let key in updatedVehicle) {
      vehicle[key] = updatedVehicle[key];
    }

    writeToDB(data);

    res.status(200).json({
      success: true,
      vehicle,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const createNewVehicle = async (req, res, next) => {
  try {
    const { kind, range, count } = req.body;
    const data = getDB();
    const newVehicle = {
      id: `v${uuid()}`,
      kind,
      range,
      count,
    };

    data.vehicles.push(newVehicle);
    writeToDB(data);

    res.status(201).json({
      success: true,
      vehicle: newVehicle,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const deleteVehicle = async (req, res, next) => {
  try {
    const { vehicleId } = req.params;
    const data = getDB();
    const vehicle = data.vehicles.find((v) => v.id === vehicleId);

    if (!vehicle) {
      return next(new HttpError("Please provide a valid vehicle id.", 400));
    }

    data.vehicles = data.vehicles.filter((v) => v.id !== vehicleId);
    writeToDB(data);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted.",
      vehicle,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

export {
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  createNewVehicle,
  deleteVehicle,
};
