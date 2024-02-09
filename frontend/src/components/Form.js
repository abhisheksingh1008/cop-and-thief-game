import { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAppContext } from "../store/ContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Cop1Image from "../assets/cop1.png";
import Cop2Image from "../assets/cop2.png";
import Cop3Image from "../assets/cop3.png";

const CityVehicleSelection = ({ cities, vehicles }) => {
  const { userId, setGameResult } = useAppContext();
  const navigate = useNavigate();
  const [cop1City, setCop1City] = useState("");
  const [cop2City, setCop2City] = useState("");
  const [cop3City, setCop3City] = useState("");
  const [cop1Vehicle, setCop1Vehicle] = useState("");
  const [cop2Vehicle, setCop2Vehicle] = useState("");
  const [cop3Vehicle, setCop3Vehicle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCityChange = (cop, e) => {
    const selectedCityId = e.target.value;
    const selectedCity = cities.find((city) => city.id === selectedCityId);
    switch (cop) {
      case "cop1":
        setCop1City(selectedCity);
        break;
      case "cop2":
        setCop2City(selectedCity);
        break;
      case "cop3":
        setCop3City(selectedCity);
        break;
      default:
        break;
    }
  };

  const handleVehicleChange = (cop, e) => {
    const selectedVehicleId = e.target.value;
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === selectedVehicleId
    );
    switch (cop) {
      case "cop1":
        setCop1Vehicle(selectedVehicle);
        break;
      case "cop2":
        setCop2Vehicle(selectedVehicle);
        break;
      case "cop3":
        setCop3Vehicle(selectedVehicle);
        break;
      default:
        break;
    }
  };

  const filterAvailableVehicles = (cop) => {
    const selectedCity = (() => {
      switch (cop) {
        case "cop1":
          return cop1City;
        case "cop2":
          return cop2City;
        case "cop3":
          return cop3City;
        default:
          return null;
      }
    })();

    if (!selectedCity) return [];

    return vehicles.filter(
      (vehicle) =>
        vehicle.count > 0 && vehicle.range >= selectedCity.distance * 2
    );
  };

  const filterSelectedCities = (cop) => {
    switch (cop) {
      case "cop1":
        return [cop2City, cop3City].filter((city) => city !== "");
      case "cop2":
        return [cop1City, cop3City].filter((city) => city !== "");
      case "cop3":
        return [cop1City, cop2City].filter((city) => city !== "");
      default:
        return [];
    }
  };

  const filterSelectedVehicles = (cop) => {
    switch (cop) {
      case "cop1":
        return [cop2Vehicle, cop3Vehicle].filter((vehicle) => vehicle !== "");
      case "cop2":
        return [cop1Vehicle, cop3Vehicle].filter((vehicle) => vehicle !== "");
      case "cop3":
        return [cop1Vehicle, cop2Vehicle].filter((vehicle) => vehicle !== "");
      default:
        return [];
    }
  };

  const updateVehicleCount = (cop, vehicle) => {
    const updatedVehicles = vehicles.map((v) =>
      v.id === vehicle.id ? { ...v, count: v.count - 1 } : v
    );
    switch (cop) {
      case "cop1":
        setCop1Vehicle(vehicle);
        break;
      case "cop2":
        setCop2Vehicle(vehicle);
        break;
      case "cop3":
        setCop3Vehicle(vehicle);
        break;
      default:
        break;
    }
  };

  const formResetHandler = () => {
    setCop1City("");
    setCop2City("");
    setCop3City("");
    setCop1Vehicle("");
    setCop2Vehicle("");
    setCop3Vehicle("");
  };

  const findThief = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/api/game//find-thief", {
        userId,
        cops: {
          cop1: {
            name: "Cop 1",
            city: cop1City,
            vehicle: cop1Vehicle,
          },
          cop2: {
            name: "Cop 2",
            city: cop2City,
            vehicle: cop2Vehicle,
          },
          cop3: {
            name: "Cop 3",
            city: cop3City,
            vehicle: cop3Vehicle,
          },
        },
      })
      .then((res) => {
        // console.log(res.data);
        setGameResult(res.data.result);
        navigate("/result");
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });

    setLoading(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setError("");
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={findThief}>
        <Box textAlign={"center"}>
          <Box
            maxWidth={{ xs: "100%", sm: "30%", md: "50%" }}
            my={2}
            mx={"auto"}
            borderRadius={"10px"}
            overflow="hidden"
          >
            <img
              src={Cop1Image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginInline: "auto",
                display: "inherit",
              }}
              alt="Cop1 image"
            />
          </Box>
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h6">
            Select city and vehicle for Cop 1
          </Typography>
        </Box>
        <Box
          display={{ xs: "block", sm: "flex" }}
          alignItems="center"
          justifyContent={"space-evenly"}
          gap={2}
        >
          <FormControl sx={{ mt: 1 }} fullWidth required>
            <InputLabel id="city">City</InputLabel>
            <Select
              label="City"
              labelId="city"
              id="city-select"
              value={cop1City.id}
              onChange={(e) => handleCityChange("cop1", e)}
            >
              {cities
                .filter(
                  (city) =>
                    !filterSelectedCities("cop1").find(
                      (selectedCity) => selectedCity.id === city.id
                    )
                )
                .map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name} - {city.distance}KM
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {cop1City && (
            <FormControl sx={{ mt: 1 }} fullWidth required>
              <InputLabel id="vehicle">Vehicle</InputLabel>
              <Select
                label="Vehicle"
                labelId="vehicle"
                id="vehicle-select"
                value={cop1Vehicle.id}
                onChange={(e) => {
                  handleVehicleChange("cop1", e);
                  updateVehicleCount(
                    "cop1",
                    vehicles.find((vehicle) => vehicle.id === e.target.value)
                  );
                }}
              >
                {filterAvailableVehicles("cop1")
                  .filter(
                    (vehicle) =>
                      !filterSelectedVehicles("cop1").includes(vehicle)
                  )
                  .map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.kind} - {vehicle.range}KM
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box textAlign={"center"}>
          <Box
            maxWidth={{ xs: "100%", sm: "30%", md: "50%" }}
            my={2}
            mx={"auto"}
            borderRadius={"10px"}
            overflow="hidden"
          >
            <img
              src={Cop2Image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginInline: "auto",
                display: "inherit",
              }}
              alt="Cop2 image"
            />
          </Box>
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h6">
            Select city and vehicle for Cop 2
          </Typography>
        </Box>
        <Box
          display={{ xs: "block", sm: "flex" }}
          alignItems="center"
          justifyContent={"space-evenly"}
          gap={2}
        >
          <FormControl sx={{ mt: 1 }} fullWidth required>
            <InputLabel id="city">City</InputLabel>
            <Select
              label="City"
              labelId="city"
              id="city-select"
              value={cop2City.id}
              onChange={(e) => handleCityChange("cop2", e)}
            >
              {cities
                .filter(
                  (city) =>
                    !filterSelectedCities("cop2").find(
                      (selectedCity) => selectedCity.id === city.id
                    )
                )
                .map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name} - {city.distance}KM
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {cop2City && (
            <FormControl sx={{ mt: 1 }} fullWidth required>
              <InputLabel id="vehicle">Vehicle</InputLabel>
              <Select
                label="Vehicle"
                labelId="vehicle"
                id="vehicle-select"
                value={cop2Vehicle.id}
                onChange={(e) => {
                  handleVehicleChange("cop2", e);
                  updateVehicleCount(
                    "cop2",
                    vehicles.find((vehicle) => vehicle.id === e.target.value)
                  );
                }}
              >
                {filterAvailableVehicles("cop2")
                  .filter(
                    (vehicle) =>
                      !filterSelectedVehicles("cop2").includes(vehicle)
                  )
                  .map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.kind} - {vehicle.range}KM
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box textAlign={"center"}>
          <Box
            maxWidth={{ xs: "100%", sm: "30%", md: "50%" }}
            my={2}
            mx={"auto"}
            borderRadius={"10px"}
            overflow="hidden"
          >
            <img
              src={Cop3Image}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                marginInline: "auto",
                display: "inherit",
              }}
              alt="Cop3 image"
            />
          </Box>
        </Box>
        <Box textAlign={"center"}>
          <Typography variant="h6">
            Select city and vehicle for Cop 3
          </Typography>
        </Box>
        <Box
          display={{ xs: "block", sm: "flex" }}
          alignItems="center"
          justifyContent={"space-evenly"}
          gap={2}
        >
          <FormControl sx={{ mt: 1 }} fullWidth required>
            <InputLabel id="city">City</InputLabel>
            <Select
              label="City"
              labelId="city"
              id="city-select"
              value={cop3City.id}
              onChange={(e) => handleCityChange("cop3", e)}
            >
              {cities
                .filter(
                  (city) =>
                    !filterSelectedCities("cop3").find(
                      (selectedCity) => selectedCity.id === city.id
                    )
                )
                .map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.name} - {city.distance}KM
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {cop3City && (
            <FormControl sx={{ mt: 1 }} fullWidth required>
              <InputLabel id="vehicle">Vehicle</InputLabel>
              <Select
                label="Vehicle"
                labelId="vehicle"
                id="vehicle-select"
                value={cop3Vehicle.id}
                onChange={(e) => {
                  handleVehicleChange("cop3", e);
                  updateVehicleCount(
                    "cop3",
                    vehicles.find((vehicle) => vehicle.id === e.target.value)
                  );
                }}
              >
                {filterAvailableVehicles("cop3")
                  .filter(
                    (vehicle) =>
                      !filterSelectedVehicles("cop3").includes(vehicle)
                  )
                  .map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.kind} - {vehicle.range}KM
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Box
          my={2}
          display={{ xs: "block", sm: "flex" }}
          alignItems="center"
          justifyContent={"space-evenly"}
          gap={2}
        >
          <Button
            sx={{ width: "100%" }}
            variant="contained"
            type="button"
            onClick={formResetHandler}
          >
            Reset
          </Button>
          <Button
            sx={{ width: "100%", mt: { xs: 1, sm: 0 } }}
            variant="contained"
            type="submit"
          >
            Go
          </Button>
        </Box>
        {error && <Typography>{error}</Typography>}
        <Snackbar
          open={error.length > 0}
          autoHideDuration={6000}
          message={error}
          action={action}
        />
      </form>
    </>
  );
};

export default CityVehicleSelection;
