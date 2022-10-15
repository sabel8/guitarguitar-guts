import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IGuitar } from "../../models/IGuitar";
import { IGuitarWithSong } from "../../models/IGuitarWithSong";
import { ISpotifyTrack } from "../../models/ISpotify";

export class GuitarPageStore {
  guitar: IGuitar | null = null;
  guitarWithSong: IGuitarWithSong | null = null;
  spotifyData: ISpotifyTrack | null = null;
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

    yield this.getSpotifyData();

    this.loading = false;
  }

  async getSpotifyData(): Promise<any> {
    if (this.guitarWithSong != null) {
      this.spotifyData = await (
        await fetch(
          "https://api.spotify.com/v1/tracks/" +
            this.guitarWithSong.spotifyId.split("?si=")[0],
          {
            method: "GET",
            headers: new Headers({
              Authorization:
                "Bearer BQAcjaV0T5IDC-VjJqp09eYBvKm-ZPVxfj546ocOEguTcgnMGlQ00z6uE8AWTXIZXPUfXR4z0QiVJMd6P6ZEW9PqfQFZzMERUmLxTLwQijQ75_x-eBSLNSpoq7Tb4Lr3f0n4ZRVbKN1iKbyJSU8c0UQ4pJ4-Fbqe_h1nojwB92RXrLOb",
            }),
          }
        )
      ).json();
    }
  }

  get youtubeId(): string | null {
    if (this.guitarWithSong == null) return null;
    return this.guitarWithSong.youtubeUrl.split("=")[1];
  }
}
