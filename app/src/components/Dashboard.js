import React, { Component } from "react";
import { Card, CardHeader, CardText } from "material-ui/Card";
import {
  GET_ONE,
  GET_LIST,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  SelectInput
} from "admin-on-rest";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import myApiRestClient from "../restClient";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Dashboard extends Component {
  state = {
    id: "",
    work: "",
    client: "",
    employee: "",
    startTime: "",
    endTime: "",
    workTime: "",

    works: []
  };

  async componentDidMount() {
    myApiRestClient(GET_LIST, "works", {
      pagination: {},
      sort: {},
      filter: {}
    }).then(
      response => (
        this.setState({ works: response.data }),
        console.log("\t\t" + JSON.stringify(this.state.works))
      )
    );
  }

  submit = async e => {
    e.preventDefault();
    myApiRestClient(GET_ONE, "works/timeWork", { id: this.state.id }).then(
      response => (
        this.setState({ id: response.data[0].id }),
        this.setState({ work: response.data[0].work }),
        this.setState({ client: response.data[0].client }),
        this.setState({ employee: response.data[0].employee }),
        this.setState({ startTime: response.data[0].startTime }),
        this.setState({ endTime: response.data[0].endTime }),
        this.setState({ workTime: response.data[0].workTime })
      )
    );
  };

  render() {
    return (
      <Card style={{ margin: "2em" }}>
        <CardHeader title="Time control of the employees in each project " />

        <CardText>
          <p>Id: {this.state.id}</p>
          <p>Work: {this.state.work}</p>
          <p>Client: {this.state.client}</p>
          <p>Start: {this.state.startTime}</p>
          <p>End: {this.state.endTime}</p>
          <p>Time: {this.state.workTime}</p>

          <hr />
          
          <p>Calculate Time of Work</p>
          <form onSubmit={this.submit}>
            <div>
              <Select
                value={this.state.id}
                onChange={e => this.setState({ id: e.target.value })}
              >
                {this.state.works.map(work => (
                  <MenuItem value={work.id}>{work.name}</MenuItem>
                ))}
              </Select>
            </div>
            <br></br>

            <Button type="submit" variant="contained">
              Calculate
            </Button>
          </form>
        </CardText>
      </Card>
    );
  }
}

export default Dashboard;
