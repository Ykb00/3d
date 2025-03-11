// /lib/materialPricing.js

// Material pricing in dollars per gram
export const materialPricing = {
  PLA: {
    infill20: 5,
    infill50: 5.5,
    infill100: 6
  },
  ABS: {
    infill20: 6,
    infill50: 6.5,
    infill100: 7
  },
  coloredPLA: {
    infill20: 8,
    infill50: 8.5,
    infill100: 9
  }
};

// Material densities in g/cm³
export const materialDensity = {
  PLA: 1.3,
  ABS: 1.3,
  coloredPLA: 1.3
};