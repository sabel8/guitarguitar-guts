import React from "react";
import "./App.css";
import { Provider } from "mobx-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline, Box } from "@mui/material";
import { Header } from "./components/Header";
import { GuitarListStore } from "./modules/GuitarList/GuitarListStore";

interface IStores {
  GuitarListStore: GuitarListStore;
}

class App extends React.Component {
  private stores: IStores;

  constructor(props: any) {
    super(props);

    this.stores = {
      GuitarListStore: new GuitarListStore(),
    };

    this.stores.GuitarListStore.loadGuitars();
  }

  render() {
    const router = createBrowserRouter(ROUTES);
    return (
      <Provider {...this.stores}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              primary: { main: "#ec661a" },
              // background: { default: "#16232d" },
            },
          })}
        >
          <Box sx={{ height: "100vh" }}>
            <CssBaseline />
            <Header />
            <RouterProvider router={router} />
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
