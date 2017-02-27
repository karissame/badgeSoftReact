import React from "react";
import {Link} from 'react-router';
import axios from "axios";

// var isUrlValid = function (userInput) {
//   var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
//   var url = new RegExp(regexQuery, "i");
//   if (url.test(userInput)) {
//     // alert('valid url: ' + userInput);
//     return true;
//   }
//   // alert('invalid url: ' + userInput);
//   return false;
// };
var isUrlValid = function (userInput) {
  var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
  var url = new RegExp(regexQuery, "i");
  if (userInput) {
    if (url.test(userInput)) {
      // alert('valid url: ' + userInput);
      return true;
    }
    // alert('invalid url: ' + userInput);
    return false;
  };
};


export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      defaultimageurl: '/img/defaultprofilepic.jpeg',
      fname: '',
      lname: '',
      password: '',
      passconfirm: '',
      imageurl: '',
      alert: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(field, event) {
    var newState = {};
    newState[field] = event.target.value;
    this.setState(newState);
  }

  handleSubmit(event) {
    var self = this;
    //   console.log('A form was submitted with value',event.value);
    if (this.state.password === this.state.passconfirm) {
      if (this.state.passconfirm && this.state.username && this.state.fname && this.state.lname) {
        console.log("Password length is: ");
        console.log(this.state.password.length);
        if (this.state.password.length < 8) {
          alert("Password not long enough...must be 8 characters");
        } else if (isUrlValid(this.state.imageurl) == false) {
          alert("Image URL is invalid, check to see if it is correct and try again.")
        }
        else {
          var user = {
            username: this.state.username,
            fname: this.state.fname,
            lname: this.state.lname,
            imageurl: (this.state.imageurl || this.state.defaultimageurl),
            password: this.state.password,
          };
        }
        ;
      } else {
        self.setState({
          alert: "Only picture is optional"
        });
      }
      console.log("Getting ready to post to server");
      console.log(user);
      axios.post('/register', {data: user})
        .then(function (response) {
          console.log("received results from server:")
          console.log(response);
          if (response.data.success) {
            console.log("Going to redirect");
            self.props.changePage("home");
          } else {
            self.setState({
              alert: "Username already exists"
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    } else {
      //   console.log("Both passwords must match. Please correct and resubmit");
      self.setState({alert: "Both passwords must match. Please correct and resubmit"});
    }
    event.preventDefault();
  }

  render() {
    console.log("in register element");
    return (
      <div className="row">
        <form id="registerform" onSubmit={this.handleSubmit}>
          <div id="profile" className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-4">
            <h2>Profile Details</h2>
            <h3 id="username">Username:&nbsp; &nbsp; </h3><input value={this.state.username}
                                                                 onChange={this.handleChange.bind(this, 'username')}/><br />
            <h3 id="fname">First Name:&nbsp;&nbsp; </h3><input value={this.state.fname}
                                                                onChange={this.handleChange.bind(this, 'fname')}/><br />
            <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><input value={this.state.lname}
                                                               onChange={this.handleChange.bind(this, 'lname')}/><br />
            <h3 id="pass">Password:&nbsp; &nbsp; &nbsp; </h3><input value={this.state.password}
                                                             onChange={this.handleChange.bind(this, 'password')}/><br />
            <h3 id="passconfirm">Password:&nbsp; &nbsp; &nbsp; </h3><input value={this.state.passconfirm}
                                                                    onChange={this.handleChange.bind(this, 'passconfirm')}/><br />
            <h3 id="imgUrl">Image Url:&nbsp; &nbsp; &nbsp; </h3><input value={this.state.imageurl}
                                                               onChange={this.handleChange.bind(this, 'imageurl')}/><br />
            <div className="alert alert-info" role="alert">{this.state.alert}</div>
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    );
  }
}
