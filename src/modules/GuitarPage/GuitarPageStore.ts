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
    this.guitar =
      (
        (yield axios.get("http://localhost:105/listGuitars/")) as {
          data: IGuitar[];
        }
      ).data.find((guitar) => guitar.skU_ID === sku) ?? null;

    this.guitarWithSong =
      (
        (yield axios.get("http://localhost:105/listCoolGuitars/")) as {
          data: IGuitarWithSong[];
        }
      ).data.find((guitar) => guitar.skU_ID === sku) ?? null;

    yield this.getSpotifyData();

    this.loading = false;
  }

  async getSpotifyData(): Promise<any> {
    if (this.guitarWithSong != null) {
      const spotifyCredentials: {
        access_token: string;
        expires_in: number;
        token_type: string;
      } = await (await fetch("http://localhost:105/spotify/")).json();
      this.spotifyData = await (
        await fetch(
          "https://api.spotify.com/v1/tracks/" +
            this.guitarWithSong.spotifyId.split("?si=")[0],
          {
            method: "GET",
            headers: new Headers({
              Authorization: `${spotifyCredentials.token_type} ${spotifyCredentials.access_token}`,
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
