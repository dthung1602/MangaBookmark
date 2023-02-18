import { Component } from "react";

import PropTypes from "prop-types";
import { Button } from "antd";
import { ReloadOutlined, BugOutlined, FundOutlined, HomeOutlined } from "@ant-design/icons";

import { LINK_ISSUE_TRACKER, ROUTE_HOME } from "../../utils/constants";
import ERROR_IMG from "../../assets/error.webp";
import "./ErrorBoundary.less";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, openStackTrace: false };
  }

  componentDidCatch = (error, errorInfo) => {
    this.setState({ error, errorInfo });
    console.error(error, errorInfo);
  };

  reload = () => {
    window.location.reload();
  };

  backHome = () => {
    window.location = ROUTE_HOME;
  };

  toggleStackTrace = () => {
    const { openStackTrace } = this.state;
    this.setState({ ...this.state, openStackTrace: !openStackTrace });
  };

  render() {
    const { error, errorInfo, openStackTrace } = this.state;

    if (error) {
      return (
        <div className="ant-result">
          <div className="ant-result-icon ant-result-image">
            <img src={ERROR_IMG} alt="404" style={{ width: "100%" }} />
          </div>
          <div className="ant-result-title">Opps! Something went wrong!</div>
          <div className="ant-result-subtitle">Please reload the page and try again.</div>
          <div className="ant-result-extra">
            <Button icon={<FundOutlined />} onClick={this.toggleStackTrace}>
              View stack trace
            </Button>
            <Button icon={<BugOutlined />} href={LINK_ISSUE_TRACKER} rel="noopener noreferrer" target="_blank">
              Report issue
            </Button>
            <Button icon={<HomeOutlined />} onClick={this.backHome}>
              Go home
            </Button>
            <Button type="primary" icon={<ReloadOutlined />} onClick={this.reload}>
              Reload page
            </Button>
            {openStackTrace ? (
              <div style={{ textAlign: "left" }}>
                <br />
                <b>Error message</b> {String(error)}
                <br />
                <b>Stack trace</b>
                <pre>{errorInfo?.componentStack}</pre>
              </div>
            ) : undefined}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
