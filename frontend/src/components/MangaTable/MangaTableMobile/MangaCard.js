import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Collapse, Skeleton } from "antd";

import MangaBasicInfo from "../MangaBasicInfo";
import { statusToClassMapping } from "../utils";
import { isEmptyObject } from "../../../utils";
import "./MangaCard.less";

const { Panel } = Collapse;

const MangaCard = ({ manga, onChangeReadStatus }) => {
  const [open, setOpen] = useState(false);
  const statusClass = statusToClassMapping[manga.status];

  if (isEmptyObject(manga)) {
    return (
      <Card
        className="manga-card"
        cover={
          <div className="cover">
            <Skeleton.Image />
          </div>
        }
      >
        <Skeleton active />
      </Card>
    );
  }

  return (
    <Card
      className={`manga-card triangle bottom-right ${statusClass}`}
      hoverable
      cover={
        <div className="cover">
          <img alt={manga.name} src={manga.image} />
        </div>
      }
      onClick={() => setOpen(!open)}
    >
      <Card.Meta description={<MangaBasicInfo manga={manga} />} />
      <Collapse bordered={false} activeKey={open ? 1 : undefined}>
        <Panel header={""} key="1" showArrow={false} className="manga-card-expand">
          HELLO WORLD
        </Panel>
      </Collapse>
    </Card>
  );
};

MangaCard.propTypes = {
  manga: PropTypes.object.isRequired,
  onChangeReadStatus: PropTypes.func.isRequired,
};

export default MangaCard;
