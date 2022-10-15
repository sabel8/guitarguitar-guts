import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { inject, observer } from "mobx-react";

interface IProps {}

@observer
export class Header extends React.Component<IProps> {
  render() {
    return (
      <AppBar color="inherit" position="static" sx={{ marginBottom: 2, backgroundColor: "black" }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color:"orangered", fontWeight: "bold" }}>
            guitarguitar
          </Typography>
          <IconButton>{/* <SettingsIcon /> */}</IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
