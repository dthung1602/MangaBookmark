import DefaultLayout from "../DefaultLayout";
import { useQueryParam } from "use-query-params";
import "./Search.less";

const Search = () => {
  const [term, setTerm] = useQueryParam("term");
  document.title = "Search | MangaBookmark";

  return (
    <DefaultLayout>
      <div>Search term: {term}</div>
    </DefaultLayout>
  );
};

export default Search;
