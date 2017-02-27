import React from "react";
import { Link } from 'react-router';
import axios from "axios";

export default class Profile extends React.Component {
    constructor() {
        super();
        // console.log("props:")
        // console.log(this.props);
        this.state={
            edit:false,
            username:'',
            fname:'',
            lname:'',
            imageurl:''
        };

        this.makeInput = this.makeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkConnection = this.checkConnection.bind(this);
    }
    makeInput() {
        // console.log("in makeInput");
        // console.log(this);
        var connection = JSON.parse(this.props.user.connection);
        this.setState({
            edit:true,
            username:this.props.user.username,
            fname:this.props.user.fname,
            lname:this.props.user.lname,
            imageurl:this.props.user.imageurl,
            dbclient:this.props.user.dbclient,
            dbhost:connection.host,
            dbuser:connection.user,
            dbpass:connection.password,
            dbselected:connection.database,
            dbtable:this.props.user.dbtable
        });
        // console.log(this.state);
        // console.log("Should be re-rendered as inputs now");
    }
    checkConnection(field,event) {
        var data = {
            client:this.state.dbclient,
            dbtable:this.state.dbtable,
            connection:{
                host:this.state.dbhost,
                user:this.state.dbuser,
                password:this.state.dbpass,
                database:this.state.dbselected
            }
        };
        var self = this;
        axios.post('/checkConnection', {data:data})
        .then(function (response) {
            // console.log(response.data.message);
            self.setState({dbalert:response.data.message});
        })
        .catch(function (error) {
            console.log(error);
            self.setState({dbalert:error});
        })
    }

    handleChange(field,event) {
        var newState = {};
        newState[field]=event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
    //   console.log('A form was submitted with value',event.value);
      if (event.value == "Cancel") {
          this.setState({edit:false});
      } else {
      if (this.state.password === this.state.passconfirm) {
          if (this.state.passconfirm) {
            //   console.log("Password change accepted. Both inputs match");
              var passChange = true;
          }
          if (passChange) {
              var user = {
                  username:this.state.username,
                  fname:this.state.fname,
                  lname:this.state.lname,
                  imageurl:this.state.imageurl,
                  password:this.state.password,
                  dbclient:this.state.dbclient,
                  dbtable:this.state.dbtable,
                  connection:JSON.stringify({
                      host:this.state.dbhost,
                      user:this.state.dbuser,
                      password:this.state.dbpass,
                      database:this.state.dbselected
                })
              };
          } else {
            //   console.log("Password is not being changed");
              var user = {
                  username:this.state.username,
                  fname:this.state.fname,
                  lname:this.state.lname,
                  imageurl:this.state.imageurl,
                  dbclient:this.state.dbclient,
                  dbtable:this.state.dbtable,
                  connection:JSON.stringify({
                      host:this.state.dbhost,
                      user:this.state.dbuser,
                      password:this.state.dbpass,
                      database:this.state.dbselected
              })
          };}
        //   console.log("Getting ready to post to server");
        //   console.log(user);
          axios.post('/updateuser', {user:user})
            .then(function (response) {
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

      } else {
            //   console.log("Both passwords must match. Please correct and resubmit");
              alert("Both passwords must match. Please correct and resubmit");
          }
      this.setState({edit:false});
      event.preventDefault();
  }}
    render() {
            if (this.props.loggedIn) {
                if (this.state.edit) {
                    return(
                        <div className="row">
                        <form id="updateform" onSubmit={this.handleSubmit} >
                          <div id="profile" className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-2">
                              <h2>Profile Details</h2>
                              <h3 id="fname">First Name:&nbsp; &nbsp; </h3><input value={this.state.fname} onChange={this.handleChange.bind(this,'fname')} placeholder={this.props.user.fname} /><br />
                              <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><input value={this.state.lname} onChange={this.handleChange.bind(this,'lname')} placeholder={this.props.user.lname} /><br />
                              <h3 id="pass">Password:&nbsp; &nbsp; &nbsp; </h3><input value={this.state.password} onChange={this.handleChange.bind(this,'password')} /><br />
                              <h3 id="passconfirm">Password:&nbsp; &nbsp; &nbsp; </h3><input value={this.state.passconfirm} onChange={this.handleChange.bind(this,'passconfirm')} /><br />
                              <h3 id="imgUrl">Image Url:&nbsp; &nbsp; &nbsp;</h3><input value={this.state.imageurl} onChange={this.handleChange.bind(this,'imageurl')} placeholder={this.props.user.imgUrl} /><br />
                              </div><div id="profile" className="col-xs-8 col-xs-offset-2 col-md-4 col-md-offset-0">
                              <h2>Database Connection</h2>
                              <h3 id="dbclient">DB Type:&nbsp; &nbsp; </h3><select value={this.state.dbclient} onChange={this.handleChange.bind(this,'dbclient')}>
                                  <option value='mysql'>MySQL</option>
                                  <option value='pg'>Postgres</option>
                                  <option value='oracle'>Oracle</option>
                                  <option value='mssql'>SQL Server</option></select><br />
                              <h3 id="dbhost">Host/IP:&nbsp; &nbsp; </h3><input value={this.state.dbhost} onChange={this.handleChange.bind(this,'dbhost')} /><br />
                              <h3 id="dbuser">User:&nbsp; &nbsp; </h3><input value={this.state.dbuser} onChange={this.handleChange.bind(this,'dbuser')} /><br />
                              <h3 id="dbpass">DB Password:&nbsp; &nbsp; </h3><input value={this.state.dbpass} onChange={this.handleChange.bind(this,'dbpass')} /><br />
                              <h3 id="dbselected">Database to Use:&nbsp; &nbsp; </h3><input value={this.state.dbselected}
                              onBlur={this.checkConnection.bind(this,'dbtable')} onChange={this.handleChange.bind(this,'dbselected')} /><br />
                              <h3 id="dbtable">Table to Use:&nbsp; &nbsp; </h3><input value={this.state.dbtable} onBlur={this.checkConnection.bind(this,'dbtable')} onChange={this.handleChange.bind(this,'dbtable')} />
                              <br />
                              <div className="alert alert-info" role="alert">{this.state.dbalert}</div>
                              <input type="submit" value="Submit" />
                              <input type="submit" value="Cancel" />
                          </div>
                          </form>
                        </div>
                    );
                } else {
                    return (
                    <div className="row">
                        <div id="updateform">
                          <div id="profile" className="col-xs-10 col-xs-offset-1 col-md-5 col-md-offset-1">
                          <h2>Profile</h2><br />
                          <h3 id="fname">First Name:&nbsp; &nbsp; </h3><h3 onClick={this.makeInput}>{this.props.user.fname}</h3><br />
                          <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><h3 onClick={this.makeInput}>{this.props.user.lname}</h3><br />
                          <h3 id="pass">Password:&nbsp; &nbsp; </h3><h3 onClick={this.makeInput}>Click to Edit</h3><br />
                          </div><div id="profile" className="col-xs-10 col-xs-offset-1 col-md-5 col-md-offset-0">
                          <h2>DB Connection</h2><br />
                          <h3 id="dbclient">Configured DB:&nbsp; &nbsp; </h3><h3 onClick={this.makeInput}>{this.props.user.dbclient || 'Click to Add!'}</h3><br />
                          </div><div class="clearfix visible-md-block"></div>
                        </div>
                    </div>
                    );}
                } else {
            return (
            <div className="row" id="profilerow">
              <div id="updateformmainpage">
                <div id="profilemainpage" className="col-xs-12">
                    <h1>Log in to continue or <button name="register" value="register" onClick={(e) => this.props.changePage("register")}>Register</button></h1>
                      <div id="mainpageheader" className="col-xs-12">
                        <h1><b>Print badges straight from your browser!</b></h1>
                      </div>
                      <div id="profilemainpage" className="col-xs-12">
                          <img id="cardexamplestall" src="/img/cardexamples/card1.jpg"></img>
                          <img id="cardexamplestall" src="/img/cardexamples/card2.jpg"></img>
                          <img id="cardexampleswide" src="/img/cardexamples/card3.jpg"></img>
                          <img id="cardexamplestall" src="/img/cardexamples/card4.jpg"></img>
                          <img id="cardexamplestall" src="/img/cardexamples/card5.jpg"></img>
                      </div>
                        <div id="mainpageheader" className="col-xs-12">
                          <h2><b>Quick! Easy! Free!</b></h2>
                        </div>
                </div>
                            <div id="cardinstructions" className="col-xs-12">
                                    <div id="stepbystep" className="col-xs-12 col-md-6">
                                      <h2><b>** No software to download or maintain **</b></h2>
                                    </div>
                                    <div id="stepbystep" className="col-xs-12 col-md-6">
                                        <h2><b>** Print to your printer of choice 24/7 **</b></h2>
                                    </div>
                                    <div id="stepbystep" className="col-xs-12 col-sm-6">
                                      <h2><b>Connect to your database</b></h2>
                                      <ul>
                                      <li>Choose which type of database you are connecting to</li>
                                      <li>Then fill out the form with your database credentials</li>
                                      </ul>
                                      <img src="/img/stepbystep/step1.png"></img>
                                    </div>
                                    <div id="stepbystep" className="col-xs-12 col-sm-6">
                                        <h2><b>Simple to add headshot placeholders</b></h2>
                                        <ul>
                                        <li>Click on the placeholder button next to employee picture</li>
                                        <li>It adds a default placeholder picture in the middle of the id</li>
                                        </ul>
                                        <img src="/img/stepbystep/step2.png"></img>

                                    </div>
                                    <div id="stepbystep" className="col-xs-12 col-sm-6">
                                        <h2><b>Inserting text fields is a snap</b></h2>
                                        <ul>
                                        <li>Click the add text button to add a text box to canvas</li>
                                        <li>Selecting from one of your database fields sends that field straight to text box and allows you to have multiple fields in same text box</li>
                                        </ul>
                                        <img src="/img/stepbystep/step3.png"></img>
                                    </div>
                                    <div id="stepbystep" className="col-xs-12 col-sm-6">
                                        <h2><b>Add shapes and get creative</b></h2>
                                        <ul>
                                          <li>Place shapes at top for background dividers</li>
                                          <li>Change colors and give gradients to different objects</li>
                                          <li>Stack objects on top of each other creating new effects</li>
                                        </ul>
                                        <img src="/img/stepbystep/step4.png"></img>
                                    </div>
                            </div>
                            <div id="videoinstruction" className="col-xs-12">
                              <h1><b>Card Editor Demonstration</b></h1>
                              <video controls>
                                <source src="/img/readme1.mp4" type="video/mp4"></source>
                              </video>
                            </div>
                </div>
              </div>
        );
        }
      }

}
