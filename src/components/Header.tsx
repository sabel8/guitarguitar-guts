import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { observer } from "mobx-react";

interface IProps {}

@observer
export class Header extends React.Component<IProps> {
  render() {
    return (
      <AppBar
        color="inherit"
        position="static"
        sx={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <Box>
            <Typography
              variant="h4"
              // component="div"
              color="primary"
              sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
              onClick={() => (window.location.href = "/")}
            >
              guitarguitar
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}
