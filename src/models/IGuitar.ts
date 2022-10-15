export interface IGuitar {
  skU_ID: string;
  asn: string;
  category: Category;
  online: boolean;
  itemName: string;
  title: string;
  brandName: string;
  description: string;
  productDetail: string;
  salesPrice: number;
  pictureMain: string;
  qtyInStock: number;
  qtyOnOrder: number;
  colour: number;
  pickup: number;
  bodyShape: number;
  createdOn: string;
  imageUrls: null;
}

export enum Category {
  GUAGCCLh = "GUAGCC_lh",
  GUAGLh = "GUAG_lh",
  GUEGLh = "GUEG_lh",
  Guag1 = "GUAG_1",
  Guag2 = "GUAG_2",
  Guagcc1 = "GUAGCC_1",
  Guba14 = "GUBA_14",
  Gueg1 = "GUEG_1",
  Gueg2 = "GUEG_2",
  Gueg7 = "GUEG_7",
}

export enum Title {
  Empty = "",
  NextDayDeliveryAvailable = "Next Day Delivery Available",
  OfficialUKFenderDealer = "Official UK Fender Dealer",
}
