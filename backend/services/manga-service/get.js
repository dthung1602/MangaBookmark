import { Manga } from "../../models/index.js";

export default async function (mangaID) {
  return Manga.findById(mangaID);
}
