import PropTypes from "prop-types";
import { Button, PageHeader as AntPageHeader, Grid } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

import "./MangaPageHeader.less";

const { useBreakpoint } = Grid;

const MangaPageHeader = ({ title, mangaCount, openNewMangaModal, updateMangas, isUpdatingMangas, updateBtnText }) => {
  const mangaCountString = `${mangaCount} manga${mangaCount > 1 ? "s" : ""}`;

  const desktop = useBreakpoint().lg;

  return (
    <AntPageHeader
      title={title}
      subTitle={mangaCountString}
      extra={
        <>
          <Button icon={<ReloadOutlined />} onClick={updateMangas} loading={isUpdatingMangas}>
            {desktop ? updateBtnText : null}
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

MangaPageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  mangaCount: PropTypes.number.isRequired,
  openNewMangaModal: PropTypes.func.isRequired,
  updateMangas: PropTypes.func.isRequired,
  isUpdatingMangas: PropTypes.bool.isRequired,
  updateBtnText: PropTypes.string.isRequired,
};

export default MangaPageHeader;
