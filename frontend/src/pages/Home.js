import { useEffect, useState } from "react";
import axios from "axios";
import {
  Backdrop,
  Box,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import Form from "../components/Form";
import { useAppContext } from "../store/ContextProvider";

const Home = () => {
  const { userId } = useAppContext();

  const [cities, setCities] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      setLoading(true);

      await axios
        .post("/api/game/start", { userId })
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/cities")
        .then((res) => {
          setCities(res.data.cities);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
        });

      axios
        .get("/api/vehicles")
        .then((res) => {
          setVehicles(res.data.vehicles);
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
        });

      setLoading(false);
    };

    fetchData();
  }, [userId]);

  return (
    <Box p={{ xs: 1, sm: 3 }}>
      <Paper sx={{ p: { xs: 2, sm: 3 } }} elevation={8}>
        {loading ? (
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : error ? (
          <Box textAlign={"center"}>
            <Typography>{error}</Typography>
          </Box>
        ) : (
          <Form cities={cities} vehicles={vehicles} />
        )}
      </Paper>
    </Box>
  );
};

export default Home;
