import { useQueryParam } from "use-query-params";
import { Input, Affix } from "antd";

import MangaListingLayout from "../MangaListingLayout";
import "./Search.less";

const Search = () => {
  const [term, setTerm] = useQueryParam("term");
  document.title = "Search | MangaBookmark";

  const onSearch = (newTerm) => {
    setTerm(newTerm);
  };

  const searchBar = (
    <Affix className="affix-container">
      <Input.Search allowClear placeholder="Search" className="search-bar" defaultValue={term} onSearch={onSearch} />
    </Affix>
  );

  // TODO this page
  return (
    <MangaListingLayout
      title="Search scan sites"
      mangasOrFactory={[]}
      loadMode="replace"
      filterNode={searchBar}
      updateMangaFilters={{}}
      updateButtonText=""
    />
  );
};

export default Search;
