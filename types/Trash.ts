export type Trash = {
  latLng: google.maps.LatLng;
  type: TrashType;
};

export type TrashType = "plastic" | "metal" | "paper" | "glass" | "organic";

const icons = "icons";
const svg = "svg";
const getIconDirectory = (filename: string) => `${icons}/${filename}.${svg}`;

export const trashTypeImage: Record<TrashType, string> = {
  plastic: getIconDirectory("plastico"),
  metal: getIconDirectory("metal"),
  paper: getIconDirectory("papel"),
  glass: getIconDirectory("vidro"),
  organic: getIconDirectory("organico"),
};
