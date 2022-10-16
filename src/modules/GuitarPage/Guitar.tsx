import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
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
import { ArrowBack, ExpandMore } from "@mui/icons-material";
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
                  <Typography variant="h6">
                    {this.store.guitar?.brandName}
                  </Typography>
                  <Typography variant="h4">
                    {this.store.guitar?.itemName}
                  </Typography>
                  <Typography variant="h5">
                    £{this.store.guitar?.salesPrice}
                  </Typography>
                  <Typography
                    variant="h5"
                    color={this.store.guitar?.qtyInStock! > 0 ? "green" : "red"}
                  >
                    {this.store.guitar?.qtyInStock! > 0
                      ? "In stock"
                      : "Out of stock"}
                  </Typography>
                  <div>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Product details</Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        dangerouslySetInnerHTML={{
                          __html: this.store.guitar?.productDetail ?? "",
                        }}
                      />
                    </Accordion>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>Description</Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        dangerouslySetInnerHTML={{
                          __html: this.store.guitar?.description ?? "",
                        }}
                      />
                    </Accordion>
                  </div>
                  {this.store.spotifyData?.artists && <Alert variant="filled" color="info">
                    This guitar is used by{" "}
                    <strong>{this.store.spotifyData?.artists[0].name}</strong>
                  </Alert>}
                </Box>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                m: 4,
                gap: 2,
                flexDirection: "column",
              }}
            >
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
