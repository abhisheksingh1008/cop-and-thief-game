import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThiefImage from "../assets/thief.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Box p={{ xs: 1, sm: 2, lg: 4 }}>
      <Card sx={{ display: { xs: "block", sm: "flex" } }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: "100%", sm: "50%" } }}
          image={ThiefImage}
          alt="Thief Image"
        />
        <Box>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="body1">
              This thief is on a run, he is hiding in one of the following
              cities, Yapkashnagar, Lihaspur, Narmis City, Shekharvati,
              Nuravgram. There are three cops ready to catch him. Your task is
              to send the cops to one of the cities in a vehicle that has a
              range such that cops can go to that city, arrest the theif and
              reutrn back to our city. Test your luck, help the cops catch this
              thief
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => {
                navigate("/play");
              }}
            >
              Start
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default Landing;
