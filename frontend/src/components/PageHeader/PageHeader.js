import React from "react";
import PropTypes from "prop-types";
import { Button, PageHeader as AntPageHeader } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

import "./PageHeader.less";

const PageHeader = ({ title, mangaCount, openNewMangaModal, updateMangas, isUpdatingMangas, updateBtnText }) => {
  const mangaCountString = `${mangaCount} manga${mangaCount > 1 ? "s" : ""}`;

  return (
    <AntPageHeader
      title={title}
      subTitle={mangaCountString}
      extra={
        <>
          <Button icon={<ReloadOutlined />} onClick={updateMangas} loading={isUpdatingMangas}>
            {updateBtnText}
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openNewMangaModal}>
            Add manga
          </Button>
        </>
      }
      className="page-header"
      backIcon={false}
      ghost={false}
    />
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  mangaCount: PropTypes.number.isRequired,
  openNewMangaModal: PropTypes.func.isRequired,
  updateMangas: PropTypes.object.isRequired,
  isUpdatingMangas: PropTypes.bool.isRequired,
  updateBtnText: PropTypes.string.isRequired,
};

export default PageHeader;
