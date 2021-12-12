import { useCallback, useState } from "react";
import { useMangaContext } from "../../hooks";

const useSelectedManga = () => {
  const [selectedManga, setSelectedManga] = useState(null);
  const loadManga = useCallback(() => selectedManga, [selectedManga]);
  const deleteSelectedMangaDone = useCallback(() => setSelectedManga(null), [selectedManga]);
  const mangaContext = useMangaContext(
    loadManga,
    setSelectedManga,
    setSelectedManga,
    setSelectedManga,
    deleteSelectedMangaDone,
  );
  return [selectedManga, setSelectedManga, mangaContext];
};

export { useSelectedManga };
