import PropTypes from "prop-types";
import { Spin, Empty, Button } from "antd";
import Icon from "@ant-design/icons";
import { Link } from "react-router-dom";

import OmniSearchResultUserMangaRow from "../OmniSearchResultUserMangaRow";
import OmniSearchResultScanlationMangaRow from "../OmniSearchResultScanlationMangaRow";
import { buildAllMangasRoute, buildSearchRoute } from "../../../utils/route";
import { AniListIcon, AnimePlanetIcon, GoogleIcon, KitsuIcon, MalIcon } from "../../../assets/official-site-icon";
import "./OmniSearchResult.less";

const loadingPlaceholder = (
  <div className="omnisearch-result-row-placeholder">
    <Spin />
  </div>
);

const emptyPlaceholder = (
  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Nothing found" className="omnisearch-result-row-empty" />
);

const officialSites = [
  {
    name: "Google",
    icon: GoogleIcon,
    buildUrl: (term) => {
      const searchParams = new URLSearchParams({ q: term });
      return "https://www.google.com/search?" + searchParams;
    },
  },
  {
    name: "MyAnimeList",
    icon: MalIcon,
    buildUrl: (term) => {
      const searchParams = new URLSearchParams({ q: term, cat: "all" });
      return "https://myanimelist.net/search/all?" + searchParams;
    },
  },
  {
    name: "AniList",
    icon: AniListIcon,
    buildUrl: (term) => {
      const searchParams = new URLSearchParams({ search: term });
      return "https://anilist.co/search/manga?" + searchParams;
    },
  },
  {
    name: "AnimePlanet",
    icon: AnimePlanetIcon,
    buildUrl: (term) => {
      const searchParams = new URLSearchParams({ name: term });
      return "https://www.anime-planet.com/manga/all?" + searchParams;
    },
  },
  {
    name: "Kitsu",
    icon: KitsuIcon,
    buildUrl: (term) => {
      const searchParams = new URLSearchParams({ text: term });
      return "https://kitsu.io/manga?" + searchParams;
    },
  },
];

const OmniSearchResult = ({ searchContext }) => {
  const { searchTerm, userMangas, isLoadingUserMangas, scanlationMangas, isLoadingScanlationMangas } = searchContext;

  return (
    <div className="omnisearch-result">
      <div key="header-user-mangas" className="omnisearch-content-header">
        From your library
        <Link to={buildAllMangasRoute({ search: searchTerm })} className="float-right">
          View more
        </Link>
      </div>
      {isLoadingUserMangas ? loadingPlaceholder : null}
      {userMangas.map((result, index) => (
        <OmniSearchResultUserMangaRow key={`user-manga-${index}`} result={result} />
      ))}
      {userMangas.length === 0 && !isLoadingUserMangas ? emptyPlaceholder : null}
      <div key="header-scanlation-mangas" className="omnisearch-content-header">
        From scanlation sites
        <Link to={buildSearchRoute(searchTerm)} className="float-right">
          View more
        </Link>
      </div>
      {isLoadingScanlationMangas ? loadingPlaceholder : null}
      {scanlationMangas.map((result, index) => (
        <OmniSearchResultScanlationMangaRow key={`scanlation-manga-${index}`} result={result} />
      ))}
      {scanlationMangas.length === 0 && !isLoadingScanlationMangas ? emptyPlaceholder : null}
      <div key="header-official-sites" className="omnisearch-content-header">
        From official sources
      </div>
      {officialSites.map(({ name, icon, buildUrl }) => (
        <Button
          size="large"
          className="omnisearch-official-site"
          key={name}
          href={buildUrl(searchTerm)}
          target="_blank"
          icon={<Icon component={icon} />}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

OmniSearchResult.propTypes = {
  searchContext: PropTypes.object.isRequired,
};

export default OmniSearchResult;
