import React from "react";
import { Link } from 'react-router';

export default class Header extends React.Component {
    constructor(props) {
        super()
        this.state = {value:
            {
                username: "",
                password: ""
            }
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeUsername(event) {
      this.state.value.username= event.target.value;
    }

    handleChangePassword(event) {
      this.state.value.password= event.target.value;
    }

    handleSubmit(event) {
    event.preventDefault();
    console.log("handle submit is running this");
      var loginObj = {
          "username":this.state.value.username,
          "password":this.state.value.password
      }
      this.setState({
          value:loginObj
      });
      console.log(loginObj);
      this.props.login(this.state.value)
    }

    render() {
        if (this.props.loggedIn) {
            return (
              <div className="nav">
                  <ul id="buttonsmargin">
                    <li onClick={(e) => this.props.login({e})}>Logout</li>
                    <li onClick={(e) => this.props.changePage("editor")}>Card Editor</li>
                    <li onClick={(e) => this.props.changePage("home")}>Profile</li></ul>
                    <ul>
                    <li><h3 id="welcomename">Welcome, {this.props.user.username}!</h3></li>
                  </ul>
                  <img id="pic" src={this.props.user.imageurl} width="75px" height="75px" />
              </div>
          );
      } else {
      return (
          <div className="nav">
          <form onSubmit={this.handleSubmit}>
            <label>Username:&nbsp;
              <input placeholder="Username" type="text" onChange={this.handleChangeUsername}
              />
            </label>
            <label>Password:&nbsp;
              <input placeholder="password" type="text" onChange={this.handleChangePassword}
              />
            </label>
            <input type="submit" value="Submit"/>
          </form><div className="alert alert-info" role="alert">{this.props.alert}</div>
          </div>
        );
        }
    }

}
