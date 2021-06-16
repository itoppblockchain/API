/* eslint-disable require-atomic-updates */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const util = require('util');
const path = require('path');
const fs = require('fs');

const https = require('https');
const http = require('http');
//const spdy = require('spdy')


var options = {
  
  key: fs.readFileSync('keys/private.key'),
  cert: fs.readFileSync('keys/certificate.crt'),
  ca: fs.readFileSync('keys/ca_bundle.crt')
  
};

let invoke = require('./fabric/invoke.js');
let network = require('./fabric/network.js');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

//use this identity to query
//const appAdmin = config.appAdmin;
const appAdmin = 'admin';
//* console.log(appAdmin);

app.post('/createTRU', async (req, res) => {

    let networkObj = await network.connectToNetwork(appAdmin);
    //* console.log('util inspecting');
    //* console.log(util.inspect(networkObj));

    //Assign Smart Contract Parameters
    let arg1 = req.body.GTIN;
    let arg2 = req.body.Quantity;
    let arg3 = req.body.BatchNumber;
    let arg4 = req.body.LocalID;
    let arg5 = req.body.TRUExpiryDate;
    let arg6 = req.body.CoCID;
    let arg7 = req.body.TraceHash;
    let arg8 = req.body.CoCHash;
    let arg9 = req.body.ReleaseFlag;
    let arg10 = req.body.RequestFlag;
    let arg11 = req.body.PaymentPeriod;
    let arg12 = req.body.ORGID;


    //console.log('req.body');
    //*console.log(req.body.GTIN);
    
    //let args = [req.body];
    let response = await network.invoke1(networkObj, false, 'createTRU', arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12);
    if (response.error) {
      res.send(response.error);
    } else {
      //*console.log('response: ');
      //*console.log(response);

      // let parsedResponse = await JSON.parse(response);
      res.send(response);
    }
});

app.post('/splitTRU', async (req, res) => {

  let networkObj = await network.connectToNetwork(appAdmin);
  //*console.log('util inspecting');
  //*console.log(util.inspect(networkObj));

  //Assign Smart Contract Parameters
  let arg1 = req.body.TRUID;
  let arg2 = req.body.Quantity;
  let arg3 = req.body.LocalID;
  let arg4 = req.body.ORGID;
  
  //console.log('req.body');
  //*console.log(req.body.GTIN);
  
  //let args = [req.body];
  let response = await network.invoke4(networkObj, false, 'splitTRU', arg1, arg2, arg3, arg4);
  if (response.error) {
    res.send(response.error);
  } else {
    //*console.log('response: ');
    //*console.log(response);

    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});

app.post('/changeOWN', async (req, res) => {

  let networkObj = await network.connectToNetwork(appAdmin);
  //*console.log('util inspecting');
  //*console.log(util.inspect(networkObj));

  //Assign Smart Contract Parameters
  let arg1 = req.body.OWNER;
  let arg2 = req.body.TRUID;
  let arg3 = req.body.ORGID;
  
  //console.log('req.body');
  //console.log(req.body.GTIN);
  
  //let args = [req.body];
  let response = await network.invoke3(networkObj, false, 'changeOWN', arg1, arg2, arg3);
  if (response.error) {
    res.send(response.error);
  } else {
    //*console.log('response: ');
    //*console.log(response);

    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});


app.post('/updateTRU', async (req, res) => {

  let networkObj = await network.connectToNetwork(appAdmin);
  //*console.log('util inspecting');
  //*console.log(util.inspect(networkObj));

  //Assign Smart Contract Parameters
  let arg1 = req.body.TRUID;
  let arg2 = req.body.PropName;
  let arg3 = req.body.PropValue;
  let arg4 = req.body.ORGID;

  //console.log('req.body');
  //*console.log(req.body.TRUID);
  
  //let args = [req.body];
  let response = await network.invoke4(networkObj, false, 'updateTRU', arg1,arg2,arg3,arg4);
  if (response.error) {
    res.send(response.error);
  } else {
    //*console.log('response: ');
    //*console.log(response);

    // let parsedResponse = await JSON.parse(response);
    res.send(response);
  }
});


app.get('/queryAllTRU', async (req, res) => {
  
  let networkObj = await network.connectToNetwork(appAdmin);
  //*console.log('util inspecting');
  //*console.log(util.inspect(networkObj));
  req.body = JSON.stringify(req.body);
  //*console.log('req.body');
  //*console.log(req.body);
  let args = [req.body];

  let response = await network.invoke(networkObj, true, 'queryAllTRU', '');
  if (response.error) {
    res.send(response.error);
  } else {
    //*console.log('response: ');
    //*console.log(response);
    let parsedResponse = await JSON.parse(response);
    //*console.log(parsedResponse);

    res.send(parsedResponse);
  }
  });

  app.post('/queryTRU', async (req, res) => {
  
    let networkObj = await network.connectToNetwork(appAdmin);
    //*console.log('util inspecting');
    //*console.log(util.inspect(networkObj));
    //req.body = JSON.stringify(req.body);
    //*console.log('req.body');
    //console.log(req.body);
    let args = req.body.TRUID;
    //*console.log(args);
    let response = await network.invoke(networkObj, true, 'queryTRU', args);
    if (response.error) {
      res.send(response.error);
    } else {
      //*console.log('response: ');
      //*console.log(response);
      let parsedResponse = await JSON.parse(response);
      //*console.log(parsedResponse);
  
      res.send(parsedResponse);
    }
    });

    app.post('/searchTRU', async (req, res) => {
  
      let networkObj = await network.connectToNetwork(appAdmin);
      //*console.log('util inspecting');
      //*console.log(util.inspect(networkObj));
      //req.body = JSON.stringify(req.body);
      //*console.log('req.body');
      //console.log(req.body);
      let arg1 = req.body.LocalID;
      //console.log(args);
      let response = await network.invoke(networkObj, true, 'searchTRU', arg1);
      if (response.error) {
        res.send(response.error);
      } else {
        //*console.log('response: ');
        //*console.log(response);
        let parsedResponse = await JSON.parse(response);
        //*console.log(parsedResponse);
    
        res.send(parsedResponse);
      }
      });


app.post('/queryTRACE', async (req, res) => {
    
    let networkObj = await network.connectToNetwork(appAdmin);
    //*console.log('util inspecting');
    //*console.log(util.inspect(networkObj));
    
    //req.body = JSON.stringify(req.body); 
    //*console.log('req.body');
    //*console.log(req.body);
    //*console.log(req.body.ORGID);
    //*console.log(req.body.TRUID);

    //req.body.organization = JSON.stringify(req.body.organization);
    //req.body.truid = JSON.stringify(req.body.truid);

    //let args = [String("ORG1"), String("TRU1")];
    
    //var args;
    //args[0] = JSON.stringify(req.body.organization);
    //args[1] = JSON.stringify(req.body.truid);
    //console.log(args);

    //console.log(args[0]);
   // console.log(args[1]);
    //args = toString(args);

    let arg1 = req.body.ORGID;
    let arg2 = req.body.TRUID;

    let response = await network.invoke2(networkObj, true, 'queryTRACE',arg1, arg2);
    if (response.error) {
      res.send(response.error);
    } else {
      //*console.log('response: ');
      //*console.log(response);
      let parsedResponse = await JSON.parse(response);
      //*console.log(parsedResponse);
      res.send(parsedResponse);
    }
   
});

app.post('/querySCA', async (req, res) => {
  let networkObj = await network.connectToNetwork(appAdmin);
  //*console.log('util inspecting');
  //*console.log(util.inspect(networkObj));
  //*console.log('req.body');
  //*console.log(req.body);
 
  let response = await network.invoke(networkObj, true, 'querySCA', req.body.ORGID);
  if (response.error) {
    res.send(response.error);
  } else {
    //*console.log('response: ');
    //*console.log(response);
    let parsedResponse = await JSON.parse(response);
    res.send(parsedResponse);
  }
 });

//app.get('/queryAll', async (req, res) => {

//  let networkObj = await network.connectToNetwork(appAdmin);
//  let response = await network.invoke(networkObj, true, 'queryAllTRU', '');
//  let parsedResponse = await JSON.parse(response);
//  res.send(parsedResponse);

//});

//app.listen(process.env.PORT || 8080);
//app.listen(443);
//http.createServer(app).listen(443);
https.createServer(options,app).listen(443);


