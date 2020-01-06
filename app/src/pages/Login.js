import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogin } from "admin-on-rest";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  submit = e => {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.userLogin(credentials);
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar align="center">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form noValidate onSubmit={this.submit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => this.setState({ username: e.target.value })}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => this.setState({ password: e.target.value })}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default connect(undefined, { userLogin })(Login);
