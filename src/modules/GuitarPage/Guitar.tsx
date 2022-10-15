import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { GuitarPageStore } from "./GuitarPageStore";
import { ArrowBack } from "@mui/icons-material";
import YouTube from "react-youtube";

interface IProps {
  GuitarPageStore?: GuitarPageStore;
}

@inject("GuitarPageStore")
@observer
export class Guitar extends React.Component<IProps> {
  store: GuitarPageStore;
  constructor(props: IProps) {
    super(props);
    this.store = this.props.GuitarPageStore!;
  }

  render() {
    return (
      <Container sx={{ mt: 2 }}>
        {this.store.loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box sx={{ mb: 4 }}>
              <Link to="/guitars">
                <Button
                  sx={{ fontSize: 18 }}
                  startIcon={<ArrowBack fontSize="large" />}
                >
                  Back to guitars
                </Button>
              </Link>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <img
                  src={this.store.guitar?.pictureMain}
                  alt={this.store.guitar?.productDetail}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "contain",
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Typography variant="caption">
                    {this.store.guitar?.brandName}
                  </Typography>
                  <Typography variant="h4">
                    {this.store.guitar?.itemName}
                  </Typography>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.store.guitar?.productDetail!,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center", m: 4 }}>
              {this.store.youtubeId && (
                <YouTube videoId={this.store.youtubeId as string} />
              )}
            </Box>
          </>
        )}
      </Container>
    );
  }
}
