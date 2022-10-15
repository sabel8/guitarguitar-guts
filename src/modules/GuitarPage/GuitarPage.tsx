import { Provider } from "mobx-react";
import { useMatch, PathMatch } from "react-router-dom";
import { GuitarPageStore } from "./GuitarPageStore";
import { Guitar } from "./Guitar";

export interface IGuitarPageProps {}

interface IStores {
  GuitarPageStore: GuitarPageStore;
}

export function GuitarPage(props: IGuitarPageProps) {
  const match = useMatch("/guitars/:sku") as PathMatch<"sku">;
  const sku: string = match?.params.sku || "";
  const stores: IStores = {
    GuitarPageStore: new GuitarPageStore(),
  };
  stores.GuitarPageStore.loadGuitar(sku);

  return (
    <Provider {...stores}>
      <Guitar />
    </Provider>
  );
}
