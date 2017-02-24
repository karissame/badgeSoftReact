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
          if (this.state.passconfirm || this.state.passconfirm) {
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
                              <h3 id="username">Username:&nbsp; &nbsp; </h3><input value={this.state.username} onChange={this.handleChange.bind(this,'username')} /><br />
                              <h3 id="fname">First Name:&nbsp; &nbsp; </h3><input value={this.state.fname} onChange={this.handleChange.bind(this,'fname')} placeholder={this.props.user.fname} /><br />
                              <h3 id="lname">Last Name:&nbsp; &nbsp; </h3><input value={this.state.lname} onChange={this.handleChange.bind(this,'lname')} placeholder={this.props.user.lname} /><br />
                              <h3 id="pass">Password:&nbsp; &nbsp; </h3><input value={this.state.password} onChange={this.handleChange.bind(this,'password')} /><br />
                              <h3 id="passconfirm">Password:&nbsp; &nbsp; </h3><input value={this.state.passconfirm} onChange={this.handleChange.bind(this,'passconfirm')} /><br />
                              <h3 id="imgUrl">Image Url:&nbsp; &nbsp;</h3><input value={this.state.imageurl} onChange={this.handleChange.bind(this,'imageurl')} placeholder={this.props.user.imgUrl} /><br />
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
            <div className="row">
            <div id="updateform">
              <div id="profile" className="col-xs-8 col-xs-offset-2">
                  <h1>Log in to continue</h1>
              </div>
            </div>
            </div>
        );
        }
      }

}
