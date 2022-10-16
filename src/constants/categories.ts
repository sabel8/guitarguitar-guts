export const categories: Record<string, {Category: string, Title: string, Parent: string}> = {
  GU: {
    Category: "Guitars -",
    Title: "Guitars",
    Parent: "",
  },
  GUAG: {
    Category: "Guitars - Acoustic",
    Title: "Acoustics",
    Parent: "GU",
  },
  GUAGCC_1: {
    Category: "Guitars - Acoustic - Classic Guitar Std",
    Title: "Classical Guitar",
    Parent: "GU",
  },
  GUAGCC_lh: {
    Category: "Guitars - Acoustic - Classic Guitar LH",
    Title: "Left Handed Classica",
    Parent: "GU",
  },
  GUBA: {
    Category: "Guitars - Bass",
    Title: "Basses",
    Parent: "GU",
  },
  GUEG: {
    Category: "Guitars - Electric",
    Title: "Electric",
    Parent: "GU",
  },
  GUAG_1: {
    Category: "Guitars - Acoustic - 6 String",
    Title: "6 String Acoustics",
    Parent: "GUAG",
  },
  GUAG_2: {
    Category: "Guitars - Acoustic - 12 String",
    Title: "12 String Acoustics",
    Parent: "GUAG",
  },
  GUAG_BG: {
    Category: "Guitars - Acoustic - Beginners",
    Title: "Beginners",
    Parent: "GUAG",
  },
  GUAG_lh: {
    Category: "Guitars - Acoustic - LH",
    Title: "Left Handed Acoustics",
    Parent: "GUAG",
  },
  GUBA_1: {
    Category: "Guitars - Bass - Solid Body",
    Title: "Solid Body Basses",
    Parent: "GUBA",
  },
  GUBA_14: {
    Category: "Guitars - Bass - 4 String SB",
    Title: "4 String Basses",
    Parent: "GUBA",
  },
  GUBA_15: {
    Category: "Guitars - Bass - 5 String SB",
    Title: "5 String Basses",
    Parent: "GUBA",
  },
  GUBA_16: {
    Category: "Guitars - Bass - 6 String SB",
    Title: "6 String Basses",
    Parent: "GUBA",
  },
  GUBA_2: {
    Category: "Guitars - Bass - Acoustic",
    Title: "Acoustic Basses",
    Parent: "GUBA",
  },
  GUBA_3: {
    Category: "Guitars - Bass - Fretless",
    Title: "Fretless Basses",
    Parent: "GUBA",
  },
  GUBA_BG: {
    Category: "Guitars - Bass - Beginners",
    Title: "Beginners",
    Parent: "GUBA",
  },
  GUBA_lh: {
    Category: "Guitars - Bass - LH",
    Title: "Left Handed Basses",
    Parent: "GUBA",
  },
  GUBASS: {
    Category: "Guitars - Bass - Short Scale",
    Title: "Short Scale Basses",
    Parent: "GUBA",
  },
  GUEG_1: {
    Category: "Guitars - Electric - Solid Body",
    Title: "Solid Body Electrics",
    Parent: "GUEG",
  },
  GUEG_2: {
    Category: "Guitars - Electric - Semi Acoustic",
    Title: "Semi Acoustic Electrics",
    Parent: "GUEG",
  },
  GUEG_34: {
    Category: "Guitars - Electric - 3/4 Sized",
    Title: "3/4 Sized",
    Parent: "GUEG",
  },
  GUEG_7: {
    Category: "Guitars - Electric - 7 String",
    Title: "7 String Electrics",
    Parent: "GUEG",
  },
  GUEG_8: {
    Category: "Guitars - Electric - 8 String",
    Title: "8 String Electrics",
    Parent: "GUEG",
  },
  GUEG_BG: {
    Category: "Guitars - Electric - Beginners",
    Title: "Beginners",
    Parent: "GUEG",
  },
  GUEG_lh: {
    Category: "Guitars - Electric - LH",
    Title: "Left Handed Electrics",
    Parent: "GUEG",
  },
};
