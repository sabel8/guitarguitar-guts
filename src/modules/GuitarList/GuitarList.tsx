import { Circle } from "@mui/icons-material";
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
  Chip,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import { categories } from "../../constants/categories";
import { BodyShape, Colour, IGuitar, Pickup } from "../../models/IGuitar";
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
                  {Object.entries(categories).map(([key, value], i) => (
                    <MenuItem value={key} key={i}>
                      {value.Category}
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
                  {Object.entries(BodyShape)
                    .filter(([k, v]) => !isNaN(k as any))
                    .map(([key, value], i) => (
                      <MenuItem value={key} key={i}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: 150 }}>
                <InputLabel>Pickup</InputLabel>
                <Select
                  value={this.listStore.filters?.pickup ?? ""}
                  label="Pickup"
                  onChange={(e) =>
                    this.listStore.setFilter("pickup", +e.target.value)
                  }
                >
                  {Object.entries(Pickup)
                    .filter(([k, v]) => !isNaN(k as any))
                    .map(([key, value], i) => (
                      <MenuItem value={key} key={i}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl sx={{ width: 150 }}>
                <InputLabel>Colour</InputLabel>
                <Select
                  value={this.listStore.filters?.colour ?? ""}
                  label="Colour"
                  onChange={(e) =>
                    this.listStore.setFilter("colour", +e.target.value)
                  }
                >
                  {Object.entries(Colour)
                    .filter(([k, v]) => !isNaN(k as any))
                    .map(([key, value], i) => (
                      <MenuItem value={key} key={i}>
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Circle htmlColor={value.toString().toLowerCase()} />{" "}
                          {value}
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              {Object.values(this.listStore.filters).filter((v) => !!v).length >
                0 && (
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Typography>Applied filters</Typography>
                  {this.listStore.filtersApplied.map(
                    ({ key, title, value }, i) => (
                      <Chip
                        key={i}
                        label={`${title}: ${value}`}
                        variant="outlined"
                        onDelete={() =>
                          this.listStore.setFilter(key as any, null)
                        }
                      />
                    )
                  )}
                </Box>
              )}
            </Box>
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
