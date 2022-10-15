import React from "react";
import { inject, observer } from "mobx-react";
import { Box, ButtonBase, styled, Typography } from "@mui/material";
import { GuitarListStore } from "../modules/GuitarList/GuitarListStore";
import { Link } from "react-router-dom";

interface IProps {
  GuitarListStore?: GuitarListStore;
}

@inject("GuitarListStore")
@observer
export class Home extends React.Component<IProps> {
  render() {
    return <ButtonBases GuitarListStore={this.props.GuitarListStore!} />;
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

function ButtonBases(props: { GuitarListStore: GuitarListStore }) {
  const images = [
    { url: "/assets/acoustic.png", title: "acoustic", category: "GUAG" },
    { url: "/assets/electric.png", title: "electric", category: "GUEG" },
    { url: "/assets/bass.png", title: "bass", category: "GUBG" },
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
      {images.map((image, i) => (
        <ImageButton focusRipple key={image.title} style={{ flex: 1 }}>
          <Link
            to={`/guitars`}
            key={i}
            onClick={() =>
              props.GuitarListStore.setFilter("category", image.category)
            }
          >
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
          </Link>
        </ImageButton>
      ))}
    </Box>
  );
}
