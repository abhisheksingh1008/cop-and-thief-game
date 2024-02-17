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
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Cop1Image from "../assets/cop1.png";
import Cop2Image from "../assets/cop2.png";
import Cop3Image from "../assets/cop3.png";
import { useAppContext } from "../store/ContextProvider";

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
      .post("/api/game/find-thief", {
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
              value={cop1City?.id}
              onChange={(e) => handleCityChange("cop1", e)}
            >
              {cities
                .filter(
                  (city) => city.id !== cop2City?.id && city.id !== cop3City?.id
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
                value={cop1Vehicle?.id}
                onChange={(e) => {
                  handleVehicleChange("cop1", e);
                }}
              >
                {vehicles
                  .filter((vehicle) => {
                    let count = 0;
                    if (cop2Vehicle?.id === vehicle.id) count++;
                    if (cop3Vehicle?.id === vehicle.id) count++;
                    return (
                      vehicle.range >= cop1City.distance * 2 &&
                      vehicle.count > count
                    );
                  })
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
              value={cop2City?.id}
              onChange={(e) => handleCityChange("cop2", e)}
            >
              {cities
                .filter(
                  (city) => city.id !== cop1City?.id && city.id !== cop3City?.id
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
                value={cop2Vehicle?.id}
                onChange={(e) => {
                  handleVehicleChange("cop2", e);
                }}
              >
                {vehicles
                  .filter((vehicle) => {
                    let count = 0;
                    if (cop1Vehicle?.id === vehicle.id) count++;
                    if (cop3Vehicle?.id === vehicle.id) count++;
                    return (
                      vehicle.range >= cop2City.distance * 2 &&
                      vehicle.count > count
                    );
                  })
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
              value={cop3City?.id}
              onChange={(e) => handleCityChange("cop3", e)}
            >
              {cities
                .filter(
                  (city) => city.id !== cop1City?.id && city.id !== cop2City?.id
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
                value={cop3Vehicle?.id}
                onChange={(e) => {
                  handleVehicleChange("cop3", e);
                }}
              >
                {vehicles
                  .filter((vehicle) => {
                    let count = 0;
                    if (cop1Vehicle?.id === vehicle.id) count++;
                    if (cop2Vehicle?.id === vehicle.id) count++;
                    return (
                      vehicle.range >= cop3City.distance * 2 &&
                      vehicle.count > count
                    );
                  })
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
