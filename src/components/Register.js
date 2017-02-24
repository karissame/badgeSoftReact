import React from "react";
import { Link } from 'react-router';
import axios from "axios";

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultimageurl:'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcToyqM2gcwH1vXUwN0vOMsl24f8Yns7Y-H-rFbssDUOVBQUeREYOA',
            fname:'',
            lname:'',
            password:'',
            passconfirm:'',
            imageurl:''
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(field,event) {
        var newState = {};
        newState[field]=event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
    //   console.log('A form was submitted with value',event.value);
      if (this.state.password === this.state.passconfirm) {
          if (this.state.passconfirm && this.state.username && this.state.fname && this.state.lname) {
              var user = {
                  username:this.state.username,
                  fname:this.state.fname,
                  lname:this.state.lname,
                  imageurl:(this.state.imageurl || this.state.defaultimageurl),
                  password:this.state.password,
              };
          } else {
              this.setState({
                  alert:"Only picture is optional"
              });
          }
          console.log("Getting ready to post to server");
          console.log(user);
          axios.post('/register', {body:user})
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

      } else {
            //   console.log("Both passwords must match. Please correct and resubmit");
              this.setState({alert:"Both passwords must match. Please correct and resubmit"});
          }
      event.preventDefault();
  }

    render() {
        console.log("in register element");
        return(
            <div className="row">
            <form id="updateform" onSubmit={this.handleSubmit} >
              <div id="profile" className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-2">
                  <h2>Profile Details</h2>
                  <h3 id="username">Username:&nbsp; &nbsp; </h3><input value={this.state.username} onChange={this.handleChange.bind(this,'username')} /><br />
                  <h3 id="fname">First Name:&nbsp; &nbsp; </h3><input value={this.state.fname} onChange={this.handleChange.bind(this,'fname')} /><br />
                  <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><input value={this.state.lname} onChange={this.handleChange.bind(this,'lname')} /><br />
                  <h3 id="pass">Password:&nbsp; &nbsp; </h3><input value={this.state.password} onChange={this.handleChange.bind(this,'password')} /><br />
                  <h3 id="passconfirm">Password:&nbsp; &nbsp; </h3><input value={this.state.passconfirm} onChange={this.handleChange.bind(this,'passconfirm')} /><br />
                  <h3 id="imgUrl">Image Url:&nbsp; &nbsp;</h3><input value={this.state.imageurl} onChange={this.handleChange.bind(this,'imageurl')} /><br />
                  <div className="alert alert-info" role="alert">{this.state.dbalert}</div>
                  <input type="submit" value="Submit" />
              </div>
              </form>
            </div>
        );
    }
}
