import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store/ContextProvider";

const Result = () => {
  const navigate = useNavigate();
  const { gameResult } = useAppContext();

  return (
    <Box p={3} textAlign={"center"}>
      <Container>
        <Typography my={2} mb={3} variant="h3">
          {gameResult}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/play");
          }}
        >
          Play Again
        </Button>
      </Container>
    </Box>
  );
};

export default Result;
