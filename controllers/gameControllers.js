import { HttpError } from "../middlewares/errorMiddleware.js";
import { gameInfo, getDB } from "../server.js";

const initializeGame = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = getDB();
    const thiefCity =
      data.cities[Math.floor(Math.random() * 10) % data.cities.length];

    gameInfo.set(userId, thiefCity);
    // console.log(gameInfo);

    res.status(200).json({
      success: true,
      message: "You can start playing the game.",
      // thiefCity,
    });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, failed to get cities.", 500)
    );
  }
};

const findThief = async (req, res, next) => {
  try {
    const { userId, cops } = req.body;

    const thiefCity = gameInfo.get(userId);
    let thiefFound = false,
      copWhoCapturedThief;

    for (let cop in cops) {
      if (cops[cop].city.name === thiefCity.name) {
        thiefFound = true;
        copWhoCapturedThief = cops[cop];
      }
    }

    res.status(200).json({
      success: true,
      result: thiefFound
        ? `Congratulations, ${copWhoCapturedThief.name} found and arrested the thief in ${thiefCity.name}!`
        : `Theif was hiding in ${thiefCity.name}. Unfortunately, none of the cops could find it.`,
    });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Something went wrong, failed to get result.", 500)
    );
  }
};

// const _ = async (req, res, next) => {
//   try {
//     res.status(200).json({});
//   } catch (err) {
//     console.log(err);
//     return next(new HttpError("Something went wrong", 500));
//   }
// };

export { initializeGame, findThief };
