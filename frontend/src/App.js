import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Result from "./pages/Result";
import { useAppContext } from "./store/ContextProvider";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const { darkTheme: darkThemeSelected } = useAppContext();

  return (
    <ThemeProvider theme={darkThemeSelected ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />}></Route>
            <Route path="/play" element={<Home />}></Route>
            <Route path="/result" element={<Result />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
