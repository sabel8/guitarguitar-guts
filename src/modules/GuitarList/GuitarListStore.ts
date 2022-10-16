import axios from "axios";
import { makeAutoObservable } from "mobx";
import { categories } from "../../constants/categories";
import { BodyShape, Colour, IGuitar, Pickup } from "../../models/IGuitar";
import { IGuitarWithSong } from "../../models/IGuitarWithSong";

const GUITAR_PER_PAGE = 9;

interface IFilters {
  category: string;
  bodyShape: number;
  pickup: number;
  colour: number;
  onlyStarred: boolean;
}

export class GuitarListStore {
  guitars: IGuitar[] = [];
  guitarsWithSongs: IGuitarWithSong[] = [];
  loading: boolean = true;
  page: number = 1;
  filters: Partial<IFilters> = { onlyStarred: false };

  constructor() {
    makeAutoObservable(this);
  }

  *loadGuitars() {
    this.loading = true;
    let guitars = (
      (yield axios.get("http://localhost:105/listGuitars")) as {
        data: IGuitar[];
      }
    ).data;

    this.guitarsWithSongs = (
      (yield axios.get("http://localhost:105/listCoolGuitars/")) as {
        data: IGuitarWithSong[];
      }
    ).data;

    this.guitars = yield guitars.map((g) => ({
      ...g,
      isStarred: !!this.guitarsWithSongs.find((gws) => gws.skU_ID === g.skU_ID),
    }));
    this.loading = false;
  }

  get pageOfGuitarsFiltered(): IGuitar[] {
    return this.filteredGuitars.slice(
      (this.page - 1) * GUITAR_PER_PAGE,
      this.page * GUITAR_PER_PAGE
    );
  }

  get filteredGuitars(): IGuitar[] {
    return this.guitars.filter((g) => {
      return (
        (this.filters.category
          ? g.category.includes(this.filters.category)
          : true) &&
        (this.filters.bodyShape
          ? g.bodyShape === this.filters.bodyShape
          : true) &&
        (this.filters.pickup ? g.pickup === this.filters.pickup : true) &&
        (this.filters.colour ? g.colour === this.filters.colour : true) &&
        (this.filters.onlyStarred ? g.isStarred : true)
      );
    });
  }

  get pageCountFiltered(): number {
    return Math.ceil(this.filteredGuitars.length / GUITAR_PER_PAGE);
  }

  setPage(page: number) {
    this.page = page;
  }

  setFilter(
    key: keyof IFilters,
    value: string | number | boolean | null = null
  ) {
    (this.filters[key] as any) = value;
    this.setPage(1);
  }

  get filtersApplied(): Array<{
    key: string;
    title: string;
    value: string;
  }> {
    return [
      {
        key: "category",
        title: "Category",
        value: this.filters.category
          ? categories[this.filters.category]?.Title ?? this.filters.category
          : "",
      },
      {
        key: "bodyShape",
        title: "Body shape",
        value: this.filters.bodyShape ? BodyShape[this.filters.bodyShape] : "",
      },
      {
        key: "pickup",
        title: "Pickup",
        value: this.filters.pickup ? Pickup[this.filters.pickup] : "",
      },
      {
        key: "colour",
        title: "Colour",
        value: this.filters.colour ? Colour[this.filters.colour] : "",
      },
      {
        key: "onlyStarred",
        title: "",
        value: this.filters.onlyStarred ? "Only famous" : "",
      },
    ].filter((f) => f.value !== "");
  }
}
