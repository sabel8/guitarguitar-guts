import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { inject, observer } from "mobx-react";

interface IProps {}

@observer
export class Header extends React.Component<IProps> {
  render() {
    return (
      <AppBar position="static" sx={{ marginBottom: 2 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guitar Guitar
          </Typography>
          <IconButton>{/* <SettingsIcon /> */}</IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
