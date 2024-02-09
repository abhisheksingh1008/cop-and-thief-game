import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../store/ContextProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Layout = () => {
  const { darkTheme: darkThemeSelected, setDarkTheme } = useAppContext();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cop and Thief Game
            </Typography>
            <Button
              color="inherit"
              variant="contained"
              onClick={() => setDarkTheme((prev) => !prev)}
            >
              {darkThemeSelected ? <LightModeIcon /> : <DarkModeIcon />}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
};

export default Layout;
