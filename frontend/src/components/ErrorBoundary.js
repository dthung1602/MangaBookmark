import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import { ReloadOutlined, BugOutlined, FundOutlined } from "@ant-design/icons";
import { LINK_ISSUE_TRACKER } from "../utils/constants";

class ErrorBoundary extends React.Component {
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

  toggleStackTrace = () => {
    const { openStackTrace } = this.state;
    this.setState({ ...this.state, openStackTrace: !openStackTrace });
  };

  render() {
    const { error, errorInfo, openStackTrace } = this.state;

    if (error) {
      return (
        <Result
          status="error"
          title="Opps! Something went wrong!"
          subTitle="Please reload the page and try again."
          extra={
            <>
              <Button icon={<FundOutlined />} onClick={this.toggleStackTrace}>
                View stack trace
              </Button>
              <Button icon={<BugOutlined />} href={LINK_ISSUE_TRACKER} rel="noopener noreferrer" target="_blank">
                Report issue
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
            </>
          }
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
