import { useContext } from "react";
import PropTypes from "prop-types";

import moment from "moment";
import { Button, Checkbox, Spin, Table, Typography } from "antd";
import { CheckOutlined, ClockCircleOutlined, DoubleLeftOutlined } from "@ant-design/icons";

import { usePagination, useShowChapters } from "./hooks";
import { truncString } from "../../utils";
import { MangaContext } from "../../contexts";
import "./ChapterList.less";

const { Column } = Table;
const { Text } = Typography;

function ChapterList({ type = "scroll", height = "medium", showDate = true, maxChapNameLen = 35 }) {
  const { manga, isMarkingChapters, markOne, markAll, markUpTo, disableMarkAll } = useContext(MangaContext);
  const { chapters } = manga;

  const { pagination, onPageChange } = usePagination(manga, chapters);
  const { chaptersToShow, showReadChapters, toggleShowReadChapters } = useShowChapters(manga, chapters);

  return (
    <div className={`chapter-list ${type} ${height}`}>
      <Spin spinning={isMarkingChapters}>
        <Table
          size="small"
          pagination={type === "scroll" ? false : { ...pagination, onChange: onPageChange }}
          showHeader={false}
          dataSource={chaptersToShow}
          title={() => (
            <div className="table-header">
              <Text strong>Chapters</Text>
              <div>
                <Button
                  size="small"
                  type="text"
                  icon={<ClockCircleOutlined />}
                  title={(showReadChapters ? "Hide" : "Show") + " read chapters"}
                  onClick={toggleShowReadChapters}
                />
                <Button
                  size="small"
                  type="text"
                  icon={<CheckOutlined />}
                  disabled={disableMarkAll}
                  title="Mark all as read"
                  onClick={markAll}
                />
              </div>
            </div>
          )}
        >
          <Column
            dataIndex="name"
            key="name"
            render={(text, chapter) => (
              <a href={chapter.link} target="_blank" rel="noopener noreferrer" title={chapter.name}>
                {truncString(chapter.name, maxChapNameLen, true)}
              </a>
            )}
          />
          {showDate ? (
            <Column
              dataIndex="createdAt"
              key="createdAt"
              render={(text, chapter) => <i>{moment.utc(chapter.createdAt).fromNow()}</i>}
            />
          ) : null}
          <Column
            dataIndex="action"
            key="action"
            width={50}
            render={(text, chapter) => {
              return (
                <div className="action">
                  <Button icon={<DoubleLeftOutlined />} size="small" type="text" onClick={() => markUpTo(chapter)} />
                  &nbsp;&nbsp;
                  <Checkbox checked={chapter.isRead} onChange={() => markOne(chapter)} />
                </div>
              );
            }}
          />
        </Table>
      </Spin>
    </div>
  );
}

ChapterList.propTypes = {
  type: PropTypes.oneOf(["scroll", "page"]),
  height: PropTypes.oneOf(["short", "medium", "tall", "infinite"]),
  showDate: PropTypes.bool,
  maxChapNameLen: PropTypes.number,
};

export default ChapterList;
