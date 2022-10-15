import axios from "axios";
import { makeAutoObservable } from "mobx";
import { guitars } from "../../constants/apiResponse";
import { IGuitar } from "../../models/IGuitar";

export class GuitarListStore {
  guitars: IGuitar[] = [];
  loading: boolean = true;

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
}
