import Container from "@mui/material/Container";
import React from "react";
import { inject, observer } from "mobx-react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  ButtonBase,
  createTheme,
  CssBaseline,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Header } from "./Header";
import { Link } from "@mui/icons-material";

interface IProps {}

@observer
export class Home extends React.Component<IProps> {
  render() {
    return <ButtonBases />;
  }
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: "100%",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ButtonBases() {
  const images = [
    { url: "/assets/acoustic.png", title: "acoustic" },
    { url: "/assets/electric.png", title: "electric" },
    { url: "/assets/bass.png", title: "bass" },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "stretch",
        minWidth: "100%",
        width: "100%",
        height: "100%",
      }}
    >
      {images.map((image) => (
        <ImageButton focusRipple key={image.title} style={{ flex: 1 }}>
          <a href={`/${image.title}`}>
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: "relative",
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title.toUpperCase()}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </a>
        </ImageButton>
      ))}
    </Box>
  );
}
