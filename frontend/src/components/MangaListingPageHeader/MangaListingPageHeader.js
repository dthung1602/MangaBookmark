import PropTypes from "prop-types";
import { PageHeader as AntPageHeader } from "@ant-design/pro-layout";
import { Button, Grid } from "antd";
import { PlusOutlined, ReloadOutlined, FileTextOutlined } from "@ant-design/icons";

import "./MangaListingPageHeader.less";
import { useContext } from "react";
import { MangaListContext } from "../../contexts";

const { useBreakpoint } = Grid;

const MangaListingPageHeader = ({
  title,
  updateButtonText,
  isUpdatingMangas,
  updateMangas,
  openNoteModal,
  openNewMangaModal,
}) => {
  const { totalFound } = useContext(MangaListContext);
  const desktop = useBreakpoint().lg;

  const mangaCountString = `${totalFound} manga${totalFound > 1 ? "s" : ""}`;

  return (
    <AntPageHeader
      title={title}
      subTitle={mangaCountString}
      extra={
        <>
          {updateButtonText ? (
            <Button icon={<ReloadOutlined />} onClick={updateMangas} loading={isUpdatingMangas}>
              {desktop ? updateButtonText : null}
            </Button>
          ) : null}
          <Button icon={<FileTextOutlined />} onClick={openNoteModal}>
            {desktop ? "Note" : null}
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openNewMangaModal}>
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
  updateButtonText: PropTypes.string,
  isUpdatingMangas: PropTypes.bool.isRequired,
  updateMangas: PropTypes.func.isRequired,
  openNoteModal: PropTypes.func.isRequired,
  openNewMangaModal: PropTypes.func.isRequired,
};

export default MangaListingPageHeader;
