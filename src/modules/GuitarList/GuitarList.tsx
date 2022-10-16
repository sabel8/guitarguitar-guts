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
  Button,
} from "@mui/material";
import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../../constants/categories";
import { BodyShape, Colour, IGuitar, Pickup } from "../../models/IGuitar";
import { GuitarListStore } from "./GuitarListStore";
import { StarOutline, Star } from "@mui/icons-material";

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 10,
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress />
            <Typography color="primary" variant="h6">
              Picking out best guitars...
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: 3,
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <FormControl sx={{ minWidth: 150 }}>
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
              <FormControl sx={{ minWidth: 150 }}>
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
              <FormControl sx={{ minWidth: 150 }}>
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
              <FormControl sx={{ minWidth: 150 }}>
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
              <Button
                startIcon={
                  this.listStore.filters.onlyStarred ? (
                    <Star />
                  ) : (
                    <StarOutline />
                  )
                }
                onClick={() =>
                  this.listStore.setFilter(
                    "onlyStarred",
                    !this.listStore.filters.onlyStarred
                  )
                }
              >
                <Typography>Only famous guitars</Typography>
              </Button>
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
                        label={title !== "" ? `${title}: ${value}` : value}
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
                    <Grid item md={4} xs={12} key={i}>
                      <GuitarListItem
                        guitar={guitar}
                        needsBadge={guitar.isStarred}
                      />
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

class GuitarListItem extends React.Component<{
  guitar: IGuitar;
  needsBadge: boolean;
}> {
  render() {
    const { guitar, needsBadge } = this.props;
    const card = (
      <Link to={`/guitars/${guitar.skU_ID}`} style={{ width: "100%" }}>
        <Card sx={{ display: "flex", height: 200, width: "100%" }}>
          <CardMedia
            component="img"
            height={200}
            image={
              guitar.pictureMain.length > 45
                ? guitar.pictureMain
                : "/assets/placeholder-guitar.png"
            }
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
              <Typography
                variant="h6"
                color={guitar.qtyInStock > 0 ? "green" : "red"}
              >
                {guitar.qtyInStock > 0 ? "In stock" : "Out of stock"}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Link>
    );

    return (
      <Badge
        color="default"
        badgeContent={needsBadge ? "⭐" : null}
        sx={{ width: "100%", fontSize: 40 }}
        componentsProps={{ badge: { style: { fontSize: 36 } } }}
      >
        {card}
      </Badge>
    );
  }
}
