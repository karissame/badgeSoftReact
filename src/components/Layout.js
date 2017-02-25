import React from "react";
import {Link} from 'react-router';
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Profile from "./Profile";
import CardEditor from "./CardEditor";
import axios from 'axios';


export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: {
         id:"",
        username: "",
        fname: "",
        lname: "",
        imgUrl: ""
      },
      page: 'home'
    };
  }

  login(loginObj) {
    const self = this;
    // console.log("in login");
    if (this.state.loggedIn) {
      this.setState({
        loggedIn: false,
        page: 'home',
        alert:''
      });
    } else {
      axios.post('/login', loginObj)
        .then(function (response) {
        //   console.log("Got data back from the server");
          console.log(response);
          if (response.data.login) {
            self.setState({
              loggedIn: true,
              user: response.data.user
            });
        } else {
            self.setState({
                alert: response.data.alert
            });
        }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  changePage(page) {
    console.log("changing page");
    console.log(page);
    if (this.state.loggedIn || page == "register" || page=="home") {
      this.setState({
        page: page
      });
    }
  }

  renderHeader() {
    return <Header login={(a) => this.login(a)} user={this.state.user} loggedIn={this.state.loggedIn} alert={this.state.alert}
                   changePage={(a) => this.changePage(a)}/>;
  }

  renderFooter() {
    return <Footer />;
  }

  renderProfile() {
    return <Profile user={this.state.user} loggedIn={this.state.loggedIn}/>;
  }

  renderSelected() {
    console.log("about to render main content block. this.state.page=");
    console.log(this.state.page);
    if (this.state.page == "home") {
      return <Profile user={this.state.user} loggedIn={this.state.loggedIn} changePage={(a) => this.changePage(a)}/>;
    } else if (this.state.page == "editor") {
      return <CardEditor user={this.state.user} />;
    } else if (this.state.page == "register") {
      return <Register changePage={(a) => this.changePage(a)} />;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">
          {this.renderHeader()}
        </div>
        <div className="container">
          {this.renderSelected()}
        </div>
        <div className="footer">
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}
