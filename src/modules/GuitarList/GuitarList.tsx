import { ExpandMore } from "@mui/icons-material";
import {
  CircularProgress,
  Container,
  Card,
  CardHeader,
  Avatar,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { inject, observer } from "mobx-react";
import React from "react";
import { IGuitar } from "../../models/IGuitar";
import { GuitarListStore } from "./GuitarListStore";

interface IProps {
  GuitarListStore?: GuitarListStore;
}

@inject("GuitarListStore")
@observer
export class GuitarList extends React.Component<IProps> {
  render() {
    return (
      <Container>
        {this.props.GuitarListStore?.loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={2}>
            {this.props.GuitarListStore?.guitars.map((guitar) => (
              <Grid item xs={4}>
                <GuitarListItem guitar={guitar} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    );
  }
}

class GuitarListItem extends React.Component<{ guitar: IGuitar }> {
  render() {
    const { guitar } = this.props;
    return (
      <Card sx={{ display: "flex", height: 200 }}>
        <CardMedia
          component="img"
          height={200}
          image={guitar.pictureMain}
          alt={guitar.itemName}
          sx={{ height: 200, width: 100, objectFit: "contain" }}
          style={{ padding: 10 }}
        />
        <Box>
          <CardContent>
            <Typography variant="h6">{guitar.itemName}</Typography>
            <Typography variant="h5" color="text.secondary">
              £{guitar.salesPrice}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    );
  }
}
