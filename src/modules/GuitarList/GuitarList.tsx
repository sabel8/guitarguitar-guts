import {
  CircularProgress,
  Container,
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
  Typography,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Badge,
  Alert,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import { BodyShape, IGuitar } from "../../models/IGuitar";
import { GuitarListStore } from "./GuitarListStore";

interface IProps {
  GuitarListStore?: GuitarListStore;
}

@inject("GuitarListStore")
@observer
export class GuitarList extends React.Component<IProps> {
  private listStore: GuitarListStore;

  constructor(props: IProps) {
    super(props);
    this.listStore = this.props.GuitarListStore!;
  }

  render() {
    return (
      <Container>
        {this.listStore.loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 3,
                gap: 1,
              }}
            >
              <FormControl sx={{ width: 150 }}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={this.listStore.filters?.category ?? ""}
                  label="Category"
                  onChange={(e) =>
                    this.listStore.setFilter(
                      "category",
                      e.target.value as string
                    )
                  }
                >
                  {[
                    { text: "Acoustic", value: "GUAG" },
                    { text: "Electric", value: "GUEG" },
                    { text: "Bass", value: "GUBG" },
                  ].map((item, i) => (
                    <MenuItem value={item.value} key={i}>
                      {item.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: 150 }}>
                <InputLabel>Body shape</InputLabel>
                <Select
                  value={this.listStore.filters?.bodyShape ?? ""}
                  label="Body shape"
                  onChange={(e) =>
                    this.listStore.setFilter("bodyShape", +e.target.value)
                  }
                >
                  {Object.entries(BodyShape).map(([key, value], i) => (
                    <MenuItem value={key} key={i}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {Object.values(this.listStore.filters).filter((v) => !!v).length >
              0 && (
              <Typography>
                Applied filters:{" "}
                {Object.entries(this.listStore.filters)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(", ")}
              </Typography>
            )}
            {this.listStore.filteredGuitars?.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  {this.listStore.pageOfGuitarsFiltered.map((guitar, i) => (
                    <Grid item xs={4} key={i}>
                      <GuitarListItem guitar={guitar} />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{ display: "flex", justifyContent: "center", padding: 3 }}
                >
                  <Pagination
                    count={this.listStore.pageCountFiltered}
                    color="primary"
                    page={this.listStore.page}
                    onChange={(_e, p) => this.listStore.setPage(p)}
                  />
                </Box>
              </>
            ) : (
              <Alert severity="error">No guitars matches the criteria!</Alert>
            )}
          </>
        )}
      </Container>
    );
  }
}

class GuitarListItem extends React.Component<{ guitar: IGuitar }> {
  render() {
    const { guitar } = this.props;
    const card = (
      <Card sx={{ display: "flex", height: 200, width: "100%" }}>
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

    const needsBadge: boolean = guitar.salesPrice < 500;

    return needsBadge ? (
      <Badge color="primary" badgeContent="Cheap!" sx={{ display: "flex" }}>
        {card}
      </Badge>
    ) : (
      card
    );
  }
}
