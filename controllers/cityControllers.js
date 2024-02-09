import { v4 as uuid } from "uuid";
import { getDB, writeToDB } from "../server.js";
import { HttpError } from "../middlewares/errorMiddleware.js";

const getAllCities = async (req, res, next) => {
  try {
    const data = getDB();

    res.status(200).json({
      success: true,
      cities: data.cities,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const getCityById = async (req, res, next) => {
  try {
    const { cityId } = req.params;
    const data = getDB();
    const city = data.cities.find((c) => c.id === cityId);

    if (!city) {
      return next(new HttpError("Please provide a valid city id.", 400));
    }

    res.status(200).json({
      success: true,
      city,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const updateCity = async (req, res, next) => {
  try {
    const { cityId } = req.params;
    const { name, distance } = req.body;
    const data = getDB();
    const city = data.cities.find((c) => c.id === cityId);

    if (!city) {
      return next(new HttpError("Please provide a valid city id.", 400));
    }

    city.name = name;
    city.distance = distance;

    writeToDB(data);
    res.status(200).json({
      success: true,
      city,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const createNewCity = async (req, res, next) => {
  try {
    const { name, distance } = req.body;
    const data = getDB();
    const newCity = {
      id: `c${uuid()}`,
      name,
      distance,
    };

    data.cities.push(newCity);
    writeToDB(data);

    res.status(201).json({
      success: true,
      city: newCity,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

const deleteCity = async (req, res, next) => {
  try {
    const { cityId } = req.params;
    const data = getDB();
    const city = data.cities.find((c) => c.id === cityId);

    if (!city) {
      return next(new HttpError("Please provide a valid city id.", 400));
    }

    data.cities = data.cities.filter((c) => c.id !== cityId);
    writeToDB(data);

    res.status(200).json({
      success: true,
      message: "City deleted.",
      city,
    });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Something went wrong", 500));
  }
};

export { getAllCities, getCityById, updateCity, createNewCity, deleteCity };
