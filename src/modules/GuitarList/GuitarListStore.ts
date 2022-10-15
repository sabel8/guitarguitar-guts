import { makeAutoObservable } from "mobx";
import { BodyShape, IGuitar } from "../../models/IGuitar";

const GUITAR_PER_PAGE = 9;

interface IFilters {
  category: string;
  bodyShape: number;
}

export class GuitarListStore {
  guitars: IGuitar[] = [];
  loading: boolean = true;
  page: number = 1;
  filters: Partial<IFilters> = {};

  constructor() {
    makeAutoObservable(this);
  }

  *loadGuitars() {
    this.loading = true;
    // this.guitars = ((yield axios.get(
    //   "https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars"
    // )) as { data: IGuitar[] }).data;
    var request = new XMLHttpRequest();
    request.open("GET", "/assets/guitars.json", false);
    request.send(null);
    let guitars = JSON.parse(request.responseText);
    this.guitars = yield guitars;
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
        (this.filters.bodyShape ? g.bodyShape === this.filters.bodyShape : true)
      );
    });
  }

  get pageCountFiltered(): number {
    return Math.ceil(this.filteredGuitars.length / GUITAR_PER_PAGE);
  }

  setPage(page: number) {
    this.page = page;
  }

  setFilter(key: keyof IFilters, value: string | number) {
    console.log(
      "🚀 ~ file: GuitarListStore.ts ~ line 55 ~ GuitarListStore ~ setFilter ~ key",
      key
    );
    (this.filters[key] as any) = value;
    this.setPage(1);
  }
}
