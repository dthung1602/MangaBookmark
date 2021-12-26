import { useContext } from "react";

import Proptypes from "prop-types";
import { Affix, Switch, Tabs, Tooltip } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { MangaListContext } from "../../contexts";
import "./MangaTabs.less";

const { TabPane } = Tabs;

const MangaTabs = ({ tab, setTab, tabMappings }) => {
  const mangaListContext = useContext(MangaListContext);

  return (
    <Affix className="affix-container">
      <Tabs
        defaultActiveKey={tab}
        onChange={setTab}
        className="tab"
        tabBarExtraContent={
          <Tooltip
            placement="bottomRight"
            title={mangaListContext.showHidden ? "Hide hidden mangas" : "Show hidden mangas"}
          >
            <Switch
              size="small"
              checked={mangaListContext.showHidden}
              onChange={(v) => mangaListContext.setShowHidden(v)}
              checkedChildren={<EyeOutlined />}
              unCheckedChildren={<EyeInvisibleOutlined />}
            />
          </Tooltip>
        }
      >
        {Object.entries(tabMappings).map(([tab, { displayName, description }]) => (
          <TabPane
            key={tab}
            tab={
              <Tooltip title={description} placement="bottomLeft">
                {displayName}
              </Tooltip>
            }
          />
        ))}
      </Tabs>
    </Affix>
  );
};

MangaTabs.propTypes = {
  tab: Proptypes.string.isRequired,
  setTab: Proptypes.func.isRequired,
  tabMappings: Proptypes.object.isRequired,
};

export default MangaTabs;
