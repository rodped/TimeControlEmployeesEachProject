import { CREATE } from "admin-on-rest";
import restClient from "../restClient";
import FlatButton from "material-ui/FlatButton";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showNotification as showNotificationAction } from "admin-on-rest";
import { push as pushAction } from "react-router-redux";

class StartWorkButton extends Component {
  handleClick = () => {
    const { push, work, showNotification } = this.props;
    console.log("\n\n" + work.name);
    restClient(CREATE, "works/startWork", { data: work})
      .then(() => {
        showNotification("Work started");
        push("/works");
      })
      .catch(e => {
        console.error(e);
        showNotification("Error: work not start", "warning");
      });
  };

  render() {
    return <FlatButton label="Start Work" onClick={this.handleClick} />;
  }
}

StartWorkButton.propTypes = {
  push: PropTypes.func,
  work: PropTypes.object,
  showNotification: PropTypes.func
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction
})(StartWorkButton);
