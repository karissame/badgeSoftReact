import React from "react";
import { Link } from 'react-router';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state={
            edit:false
        };

        this.makeInput = this.makeInput.bind(this);
    }
    makeInput() {
        console.log("in makeInput");
        console.log(this);


        this.setState({edit:true});
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
                if (this.state.edit) {
                    return(
                        <div className="row">
                          <div id="profile" className="col-xs-8 col-xs-offset-2">
                            <form onSubmit={this.handleSubmit}>
                              <h3 id="username">Username:&nbsp; &nbsp; </h3><input value={this.state.value} onChange={this.handleChange} placeholder={this.props.user.username} /><br />
                              <h3 id="fname">First Name:&nbsp; &nbsp; </h3><input value={this.state.value} onChange={this.handleChange} placeholder={this.props.user.fname} /><br />
                              <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><input value={this.state.value} onChange={this.handleChange} placeholder={this.props.user.lname} /><br />
                              <h3 id="pass">Password:&nbsp; &nbsp; </h3><input value={this.state.value} onChange={this.handleChange} /><br />
                              <h3 id="passconfirm">Password:&nbsp; &nbsp; </h3><input value={this.state.value} onChange={this.handleChange} /><br />
                              <h3 id="imgUrl">Image Url:&nbsp; &nbsp;<input value={this.state.value} onChange={this.handleChange} placeholder={this.props.user.imgUrl} /></h3>
                              <input type="submit" value="Submit" />
                            </form>
                          </div>
                        </div>
                    );
                } else {
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
                    );}
                } else {
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
