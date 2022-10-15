import { makeAutoObservable } from "mobx";
import { IGuitar } from "../../models/IGuitar";
import { IGuitarWithSong } from "../../models/IGuitarWithSong";

export class GuitarPageStore {
  guitar: IGuitar | null = null;
  guitarWithSong: IGuitarWithSong | null = null;
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
    let request = new XMLHttpRequest();
    request.open("GET", "/assets/guitars.json", false);
    request.send(null);
    let guitars: IGuitar[] = JSON.parse(request.responseText);
    this.guitar = yield guitars.find((g) => g.skU_ID === sku);

    request = new XMLHttpRequest();
    request.open("GET", "/assets/guitarswithsongs.json", false);
    request.send(null);
    let guitarsWithSongs: IGuitarWithSong[] = JSON.parse(request.responseText);

    this.guitarWithSong = yield guitarsWithSongs.find((g) => g.skU_ID === sku);
    this.loading = false;
  }

  get youtubeId(): string | null {
    if (this.guitarWithSong == null) return null;
    return this.guitarWithSong.youtubeUrl.split("=")[1];
  }
}
