import { CREATE } from "admin-on-rest";
import restClient from "../restClient";
import FlatButton from "material-ui/FlatButton";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showNotification as showNotificationAction } from "admin-on-rest";
import { push as pushAction } from "react-router-redux";

class EndWorkButton extends Component {
  handleClick = () => {
    const { push, work, showNotification } = this.props;
    restClient(CREATE, "works/endWork", { data: work })
      .then(() => {
        showNotification("Work ended");
        push("/works");
      })
      .catch(e => {
        console.error(e);
        showNotification("Error: work not end", "warning");
      });
  };

  render() {
    return <FlatButton label="End Work" onClick={this.handleClick} />;
  }
}

EndWorkButton.propTypes = {
  push: PropTypes.func,
  work: PropTypes.object,
  showNotification: PropTypes.func
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction
})(EndWorkButton);
