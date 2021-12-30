import { useState, useContext } from "react";

import PropTypes from "prop-types";
import { Input } from "antd";

import { MangaContext } from "../../contexts";
import "./MangaUrlInput.less";

const { Search } = Input;

const MangaUrlInput = ({ onSearch }) => {
  const { isLoading, setErrors, errors } = useContext(MangaContext);
  const [link, setLink] = useState("");

  const wrappedOnSearch = () => {
    try {
      onSearch(new URL(link).toString());
    } catch (e) {
      setErrors({
        link: {
          value: link,
          msg: `"${link}" is not a valid URL`,
        },
      });
    }
  };

  return (
    <div>
      <Search
        placeholder="Enter manga link"
        enterButton
        autoFocus={true}
        value={link}
        onChange={(event) => setLink(event.target.value)}
        loading={isLoading}
        onSearch={wrappedOnSearch}
      />
      {!errors ? null : (
        <div className="manga-preview-errors">
          {Object.entries(errors).map(([field, { msg }]) => (
            <div key={field}>
              <b>{field}: </b> {msg}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

MangaUrlInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MangaUrlInput;
