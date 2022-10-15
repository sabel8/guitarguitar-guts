import { makeAutoObservable } from "mobx";
import { guitars } from "../../constants/apiResponse";
import { IGuitar } from "../../models/IGuitar";

const GUITAR_PER_PAGE = 9;

interface IFilters {
  category: string;
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
    // const guitars = (yield axios.get(
    //   "https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars"
    // )) as { data: IGuitar[] };
    // this.guitars = guitars.data;
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
      return this.filters.category
        ? g.category.includes(this.filters.category)
        : true;
    });
  }

  get pageCountFiltered(): number {
    return Math.ceil(this.filteredGuitars.length / GUITAR_PER_PAGE);
  }

  setPage(page: number) {
    this.page = page;
  }

  setFilter(key: keyof IFilters, value: string) {
    console.log(
      "🚀 ~ file: GuitarListStore.ts ~ line 55 ~ GuitarListStore ~ setFilter ~ key",
      key
    );
    this.filters[key] = value;
    this.setPage(1);
  }
}
