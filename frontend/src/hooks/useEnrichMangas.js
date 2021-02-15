import { useState, useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";

const enrichManga = (manga, supportedSites) => {
  const unknownSite = {
    name: "Unknown",
    homepage: "",
    lang: "en",
  };
  if (manga) {
    manga.mangaSite = supportedSites.find((site) => site.name === manga.site) || unknownSite;
  }
  return manga;
};

const enrichMangas = (mangas, supportedSites) => {
  for (let manga of mangas) {
    enrichManga(manga, supportedSites);
  }
  return mangas;
};

const useEnrichManga = () => {
  const [{ supportedSites }] = useContext(GlobalContext);
  const [manga, setRawManga] = useState(null);

  const setManga = (value) => {
    if (typeof value === "function") {
      setRawManga((...args) => {
        return enrichManga(value(...args), supportedSites);
      });
    } else {
      setRawManga(enrichManga(value, supportedSites));
    }
  };
  return [manga, setManga];
};

const useEnrichMangas = () => {
  const [{ supportedSites }] = useContext(GlobalContext);
  const [mangas, setRawMangas] = useState([]);

  const setMangas = (value) => {
    if (typeof value === "function") {
      setRawMangas((...args) => {
        return enrichMangas(value(...args), supportedSites);
      });
    } else {
      setRawMangas(enrichMangas(value, supportedSites));
    }
  };
  return [mangas, setMangas];
};

export { useEnrichMangas, useEnrichManga };
