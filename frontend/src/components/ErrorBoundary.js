import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  reload() {
    window.location.reload(true);
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="Opps! Something went wrong!"
          subTitle="Please reload the page and try again."
          extra={
            <Button type="primary" key="reload" icon={<ReloadOutlined />} onClick={this.reload}>
              Reload page
            </Button>
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
