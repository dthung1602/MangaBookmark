import PropTypes from "prop-types";
import { Button, PageHeader as AntPageHeader, Grid } from "antd";
import { PlusOutlined, ReloadOutlined, FileTextOutlined } from "@ant-design/icons";

import "./MangaListingPageHeader.less";
import { useContext } from "react";
import { MangaListContext } from "../../contexts";
import { useUpdateMultipleAPI } from "../../hooks";

const { useBreakpoint } = Grid;

const MangaListingPageHeader = ({ title, updateButtonText, updateFilter }) => {
  const { totalFound } = useContext(MangaListContext);
  const [isUpdatingMangas, updateMangas] = useUpdateMultipleAPI(updateFilter);
  const desktop = useBreakpoint().lg;

  const mangaCountString = `${totalFound} manga${totalFound > 1 ? "s" : ""}`;

  return (
    <AntPageHeader
      title={title}
      subTitle={mangaCountString}
      extra={
        <>
          <Button icon={<ReloadOutlined />} onClick={updateMangas} loading={isUpdatingMangas}>
            {desktop ? updateButtonText : null}
          </Button>
          <Button icon={<FileTextOutlined />}>{desktop ? "Note" : null}</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            {desktop ? "Add manga" : null}
          </Button>
        </>
      }
      className="manga-page-header"
      backIcon={false}
      ghost={false}
    />
  );
};

MangaListingPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  updateButtonText: PropTypes.string.isRequired,
  updateFilter: PropTypes.object.isRequired,
};

export default MangaListingPageHeader;
