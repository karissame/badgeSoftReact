import React from "react";
import { Link } from 'react-router';
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import CardEditor from "./CardEditor";
import axios from 'axios';


export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            user: {
                username: "",
                fname: "",
                lname: "",
                imgUrl: ""
            }
        };
    }
    login(loginObj) {
        const self=this;
        console.log("in login");
        if (this.state.loggedIn) {
            this.setState({
                loggedIn: false
            });
        } else {
                axios.post('/login',loginObj)
                  .then(function (response) {
                    console.log("Got data back from the server");
                    console.log(response);
                    if (response.data.login) {
                        self.setState({
                            loggedIn: true,
                            user: response.data.user
                        });
                        console.log(this.state.user);

                    }


                  })
                  .catch(function (error) {
                   console.log(error);
                   });
              }



        }
    renderCardEditor() {
        return <CardEditor />
    }
    renderHeader() {
        return <Header login={(a) => this.login(a)} user={this.state.user} loggedIn={this.state.loggedIn}/>;
    }
    renderFooter() {
        return <Footer />;
    }
    renderProfile() {
        return <Profile user={this.state.user} loggedIn={this.state.loggedIn}/>;
    }
    render() {
            return (
                <div className="wrapper">
                    <div className="header">
                        {this.renderHeader()}
                    </div>
                    <div className="container">
                    <div className="editor">
                        {this.renderCardEditor()}
                    </div></div>
                    <div className="footer">
                        {this.renderFooter()}
                    </div>
                </div>
            );
        }
    }
