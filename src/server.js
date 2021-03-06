// 'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import axios from 'axios';
const bodyParser = require('body-parser');


// const mongoose = require('mongoose');
// const bluebird = require('bluebird');
// mongoose.Promise = bluebird;

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
// mongoose.connect('mongodb://localhost/reactLoginDemo');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '35.166.251.127',
    user : 'karissa',
    password : 'wnaptihtr',
    database : 'badge'
  }
});

// ******  PASSWORD ENCRYPTION  ******
var bcrypt = require('bcrypt');
const saltRounds=10;
//never store plaintext password!!!!!EVER!!!!EVER!!!!

const myPass = 'secretpw';
bcrypt.genSalt(saltRounds,function(err,salt){
    console.log("salt",salt);
    bcrypt.hash(myPass,salt,function(err, hash){
        //Will store with user record
    });
});

var hash="$2a$10$FrjwaswIyGTg/RcTvUtpi.xvxSXEQiHHjBqnobQPHMolqDl4N3dGG";
bcrypt.compare(myPass,hash,function(err,res){
});

var UserClass = function()  {
    this.fname = "";
    this.lname = "";
    this.username = "";
    this.password = "";
    this.imageurl = "";
};

UserClass.prototype.register = function(callback) {
    var tryingThis = this;
    console.log("attempting to register");
    console.log(this.username);
    knex.select('*').from('user').where('username',this.username)
        .asCallback(function(err,rows)    {
            if (err)    {
                return console.error(err);
            }
            // if user found
            if (typeof rows[0] !== "undefined" && typeof rows[0].username==="string") {
                if (rows[0].username)  {
                    console.log("username already exists, username: " + rows[0].username);
                    callback({success:false,message:'user not saved'});
                }
            var err = new Error();
            err.status = 310;
            console.log('Signup error', err.message);
            // callback({success:false,message:'user not saved'});
            }
            // save user
            else {
                    // "this" instead of user to pass in
                    console.log("user was not found in query. About to log user then insert");
                    console.log(tryingThis.fname);
                    if (!tryingThis.imageurl) {
                        tryingThis.imageurl = "https://www.carthage.edu/themes/toph/assets/img/generic-logo.png";
                    }
                    knex('user').insert({fname:tryingThis.fname,lname:tryingThis.lname,username:tryingThis.username,password:tryingThis.password,imageurl:tryingThis.imageurl})
                    .asCallback(function(err,user)    {
                        if (err)    {
                            console.log('Signup error', err.message);
                            callback({success:false,message:'user not saved'});
                        }
                        // console.log(this.username);
                        console.log(user);
                        callback({success:true,message:'user saved',data:user});
                    });
                };
        });
    };

app.get("/getDesign", function(req, res) {
    console.log("in server, this is the req.query", req.query);
    var designid=req.query.designid;
    console.log(designid);
    var userid=req.query.userid;
    console.log(userid);
    knex.select('design').from('designs').where('designid',designid)
    .asCallback(function(err,data)    {
        if (err)    {
            console.log("error from knex call");
            res.send(console.error(err));
        }
        console.log("no error");
        if (data) {
            console.log("there is data returned from query");
        } if (data[0]) {
            console.log("there is a first object");
        }
        // console.log(data);
        // console.log(data[0]);
        console.log("About to log design rec'd");
        console.log(data[0].design);
        if (data[0].design) {
            // console.log(data[0]);
            console.log("'"+data[0].design+"'");
            res.send({design:data[0].design});
        } else {
            console.log("no data received from knex call");
            res.send("no data received from knex call");
        }
    });
});

// ********************
app.post("/login",function(req,res){
    // console.log(req.body);
    var username=req.body.username;
    var password=req.body.password;

    knex.select('*').from('user').where('username',username).limit(1)
        .asCallback(function(err,user)    {
            if (err)    {
                return console.error(err);
            }
            // console.log(user);
            if (user)    {
                console.log("User found. Comparing password next...");
                bcrypt.compare(password,user[0].password, function(err,loginresult)               {
                    // console.log("res compare",res);
                    if(loginresult){
                        // console.log("passwords match");
                        // console.log("user object is: "+user[0]);
                        res.json({login:true,user:user[0]});
                    } else {
                        // console.log("passwords don't match");
                        res.json({login:false,alert:"username or password incorrect"});
                    }
                });
            } else {
                        // console.log('failed to login');
                        res.send({login:false,alert:"username or password incorrect"});
                    }

                })

});

// **************************
app.post('/checkConnection', function(req,res) {
    // console.log('checking user supplied db');
    // console.log(req.body.data);
    var table = req.body.data.dbtable;
    var userknex = require('knex')({
      client: req.body.data.client,
      connection: req.body.data.connection,
    });
    userknex.select('*').from(table).limit(1)
    .asCallback(function(err,results)    {
        if (err)    {
            if (err.code == 'ER_NO_TABLES_USED') {
                res.send({success:true,message:"Connection OK, Enter the table you wish to use"});
            } else if (err.code == 'ER_BAD_DB_ERROR') {
                res.send({success:false,message:"Please check your Database name"});
            } else if (err.code == 'ER_NO_SUCH_TABLE') {
                res.send({success:true,message:"Connection OK, Table Name Incorrect"});
            }else {
            res.send({success:false,message:err.message});
            }
        } else{
            if (results) {
                res.send({success:true,message:'Successfully connected to your Table'});
            }
        }
    })
});

// **************************
app.post('/getColumns', function(req,res) {
    // console.log('checking columns for this connection:');
    var table = req.body.data.dbtable;
    var userknex = require('knex')({
      client: req.body.data.client,
      connection: req.body.data.connection,
    });
    userknex(table).columnInfo()
      .asCallback(function(err,results)    {
        if (err)    {
            console.log("error retrieving column info");
            res.send({success:false,message:err.message});
            }
        else{
            // console.log("Got column response as ",results);
            var columns = results;
            console.log("About to check for designs");
            knex('designs').select('*').havingIn('userid',[req.body.data.userid,0])
              .asCallback(function(err,results2) {
                  if (err)    {
                      console.log("Error retrieving designs");
                      res.send({success:false,message:err.message});
                      }
                  else {
                      var designs = results2;
                      console.log("designs received");
                      res.send({success:true,message:columns,designs:designs});
                  }
              })
            // console.log(results);
        }
    })
});


// **************************
app.post('/saveDesign', function(req,res) {
    console.log('received card design to server');
    console.log(req.body.userid);
    var designid = req.body.designid || "";
    var design = req.body.design;
    var userid = req.body.userid;
    if (designid && designid>1) {
        console.log("attemptimg to update existing design");
        knex('designs').update({design:design}).where('designid',designid)
          .asCallback(function(err,results)    {
            if (err)    {
                res.send({success:false,message:err.message});
                }
            else{
                console.log("update result is: ",results);
                res.send({success:true,message:results});
            }
        })
    } else {
      console.log("No designid supplied. Going to insert new design");
      knex('designs').insert({userid:userid, design:design})
        .asCallback(function(err,results)    {
            if (err)    {
                res.send({success:false,message:err.message});
                }
            else{
                console.log("Design saved ",results);
                res.send({success:true,message:results});
        }
      })

    }
});


// **************************
app.post("/register", function(req,res) {
    console.log("starting registration");
    var newUser = new UserClass();
    console.log(req.body)
    newUser.fname = req.body.data.fname;
    newUser.lname = req.body.data.lname;
    newUser.username = req.body.data.username;
    newUser.imageurl = req.body.data.imageurl;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.data.password, salt);
    newUser.password = hash;
    console.log("Password is " + newUser.password);
    console.log("about to register this user info:");
    console.log(newUser);
    newUser.register(function(response){
        console.log(response);
        if(response.success){
            res.send({success:true,message:"all good"});
        } else {
            res.send({success:false,message:'user not saved'});
        }
    });
});

// **************************
app.post("/updateuser", function(req,res) {
    // console.log("starting registration in server");
    var newUser = req.body.user;
    // console.log("received these user values from react");
    // console.log(newUser);
    if (req.body.user.password) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.user.password, salt);
        newUser.password = hash;
        // console.log("Password is " + newUser.password);
    }
    // console.log("about to register this user info:");
    // console.log(newUser);
    knex('user').where('username',newUser.username).update(newUser)
        .asCallback(function(err,user)    {
            if (err)    {
                return console.error(err);
            }
            // console.log(user);
            if (user)    {
                res.send("update success");
            } else {
            res.send("update returned no response");
        }
    })
});

// **************************
// universal routing and rendering
app.get('*', (req, res) => {
    // console.log("req.url: "  + req.url);
    match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }
    //   console.log("redirecting to :",redirectLocation);
      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

    //   console.log({ markup })
      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  // console.info("Server running on http://localhost:${port} [${env}]");
});
