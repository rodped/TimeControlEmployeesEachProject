import { GET_ONE } from "admin-on-rest";
import restClient from "../restClient";
import FlatButton from "material-ui/FlatButton";
import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { showNotification as showNotificationAction } from "admin-on-rest";
import { push as pushAction } from "react-router-redux";

class TimeWorkButton extends Component {
  state = {
    response: null
  };
  btnTime = createRef();

  handleClick = () => {
    const { push, work, showNotification } = this.props;
    restClient(GET_ONE, "works/timeWork", { id: work.id })
      .then(response => {
        showNotification("Time of Work Calculated");
        this.setState({ response: response });
        // this.props.history.push("/");
        console.log("\t\t" + JSON.stringify(this.state.response.data[0].id));
        push("/");
        // this.btnTime.label = "";
      })
      .catch(e => {
        console.error(e);
        showNotification(
          "Error: is not possible calculate the time of work",
          "warning"
        );
      });
  };

  response() {
    return this.state.response.data;
  }

  render() {
    return (
      <FlatButton
        ref={this.btnTime}
        label="Hours Work"
        onClick={this.handleClick}
      >
        {/* {this.state.response.data} */}
      </FlatButton>
    );
  }
}

TimeWorkButton.propTypes = {
  push: PropTypes.func,
  work: PropTypes.object,
  showNotification: PropTypes.func
};

export default connect(null, {
  showNotification: showNotificationAction,
  push: pushAction
})(TimeWorkButton);
