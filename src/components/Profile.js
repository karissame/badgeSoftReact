import React from "react";
import { Link } from 'react-router';

export default class Profile extends React.Component {
    constructor() {
        super();
        console.log("props:")
        console.log(this.props);
        this.state={
            edit:false,
            username:'',
            fname:'',
            lname:'',
            imageurl:''
        };

        this.makeInput = this.makeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    makeInput() {
        console.log("in makeInput");
        console.log(this);
        this.setState({
            username:this.props.user.username,
            fname:this.props.user.fname,
            lname:this.props.user.lname,
            imageurl:this.props.user.imageurl,
            password:'',
            passconfirm:''
        });
        this.setState({edit:true});
    }
    handleChange(field,event) {
        var newState = {};
        newState[field]=event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
      console.log('A form was submitted');
      if (this.state.password === this.state.passconfirm) {
          if (this.state.passconfirm || this.state.passconfirm) {
              console.log("Password change accepted. Both inputs match");
          }
        //   axios.post('/updateuser') {
          //
        //   }
      } else {
              console.log("Both passwords must match. Please correct and resubmit");
              alert("Both passwords must match. Please correct and resubmit");
          }
      this.setState({edit:false});
    // ?Fill this in
      event.preventDefault();
    }
    render() {
            if (this.props.loggedIn) {
                if (this.state.edit) {
                    return(
                        <div className="row">
                          <div id="profile" className="col-xs-8 col-xs-offset-2">
                            <form onSubmit={this.handleSubmit}>
                              <h3 id="username">Username:&nbsp; &nbsp; </h3><input value={this.state.username} onChange={this.handleChange.bind(this,'username')} /><br />
                              <h3 id="fname">First Name:&nbsp; &nbsp; </h3><input value={this.state.fname} onChange={this.handleChange.bind(this,'fname')} placeholder={this.props.user.fname} /><br />
                              <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><input value={this.state.lname} onChange={this.handleChange.bind(this,'lname')} placeholder={this.props.user.lname} /><br />
                              <h3 id="pass">Password:&nbsp; &nbsp; </h3><input value={this.state.password} onChange={this.handleChange.bind(this,'password')} /><br />
                              <h3 id="passconfirm">Password:&nbsp; &nbsp; </h3><input value={this.state.passconfirm} onChange={this.handleChange.bind(this,'passconfirm')} /><br />
                              <h3 id="imgUrl">Image Url:&nbsp; &nbsp;</h3><input value={this.state.imageurl} onChange={this.handleChange.bind(this,'imageurl')} placeholder={this.props.user.imgUrl} />
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
