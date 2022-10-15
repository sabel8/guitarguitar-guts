import { makeAutoObservable } from "mobx";
import { IGuitar } from "../../models/IGuitar";

export class GuitarPageStore {
  guitar: IGuitar | null = null;
  loading: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  *loadGuitar(sku: string) {
    this.loading = true;
    // this.guitar = ((yield axios.get(
    //   "https://services.guitarguitar.co.uk/WebService/api/hackathon/guitars/" +
    //     id
    // )) as { data: IGuitar }).data;
    var request = new XMLHttpRequest();
    request.open("GET", "/assets/guitars.json", false);
    request.send(null);
    let guitars: IGuitar[] = JSON.parse(request.responseText);
    this.guitar = yield guitars.find((g) => g.skU_ID === sku);
    this.loading = false;
  }
}
