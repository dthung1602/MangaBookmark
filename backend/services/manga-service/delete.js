import { Manga } from "../../models/index.js";

export default (async function (manga) {
  await Manga.findByIdAndDelete(manga.id);
});
