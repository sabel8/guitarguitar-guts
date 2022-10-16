export interface IGuitar {
  skU_ID: string;
  asn: string;
  category: string;
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
  isStarred: boolean;
}

export enum Title {
  Empty = "",
  NextDayDeliveryAvailable = "Next Day Delivery Available",
  OfficialUKFenderDealer = "Official UK Fender Dealer",
}

export enum BodyShape {
  SStyle = 1,
  TStyle = 2,
  DoubleCut = 3,
  Offset = 4,
  HollowBody = 5,
  VStyle = 6,
  SmallBody = 7,
  Orchestral = 8,
  GrandAuditorium = 9,
  Dreadnought = 10,
  Jumbo = 11,
  Explorer = 12,
  SingleCut = 13,
  Combo = 14,
  Head = 15,
  Cabinet = 16,
}

export enum Pickup {
  ElectroAcoustic = 1,
  SS = 2,
  SSS = 3,
  HH = 4,
  HHH = 5,
  HS = 6,
  HSS = 7,
  HSH = 8,
  P90 = 9,
  S = 10,
  H = 11,
}

export enum Colour {
  Red = 3,
  Orange = 12,
  Yellow = 4,
  Green = 6,
  Blue = 5,
  Purple = 13,
  Pink = 8,
  Brown = 7,
  Gold = 9,
  Silver = 10,
  Grey = 11,
  Black = 1,
  White = 2,
  Natural = 14,
  Multicolour = 15,
}
