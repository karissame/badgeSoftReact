import React from "react";
import { Link } from 'react-router';

export default class Profile extends React.Component {
    makeInput(e) {
        var target = (e.target) ? e.target : e.srcElement;
        console.log(target);
        // target.ClassName.remove("hidden");
        target.replace(/<h2 onClick={this.makeInput}>/,'<input type="text" value={this.state.value} onChange={this.handleChange} placeholder=');
        target.replace(/<\/h2>/,' />');
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      console.log('A form was submitted');
      event.preventDefault();
    }
    render() {
            if (this.props.loggedIn) {
            return (
            <div className="row">
              <div id="profile" className="col-xs-8 col-xs-offset-2">
                <form onSubmit={this.handleSubmit}>
                  <h3 id="username">Username:&nbsp; &nbsp; </h3><h2 onClick={this.makeInput}>{this.props.user.username}</h2><br />
                  <h3 id="fname">First Name:&nbsp; &nbsp; </h3><h2 onClick={this.makeInput}>{this.props.user.fname}</h2><br />
                  <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><h2 onClick={this.makeInput}>{this.props.user.lname}</h2><br />
                  <h3 id="pass">Password:&nbsp; &nbsp; </h3><h2 onClick={this.makeInput}>Click to Edit</h2><br />
                  <h3 id="passconfirm" className="hidden">Password:&nbsp; &nbsp; </h3><h2 onClick={this.makeInput}></h2><br />
                  <h3 id="imgUrl" className="hidden">Image Url:&nbsp; &nbsp;<h2 onClick={this.makeInput}>{this.props.user.imgUrl}</h2></h3>
                  <input type="submit" className="hidden" value="Submit" />
                </form>
              </div>
            </div>
        );} else {
            return (
            <div className="row">
              <div id="profile" className="col-xs-8 col-xs-offset-2">
                  <h1>Log in to continue</h1>
              </div>
            </div>
        );
        }
      }

}
