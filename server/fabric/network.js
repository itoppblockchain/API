//Import Hyperledger Fabric 1.4 programming model - fabric-network
'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const fs = require('fs');

//Read the config file
const configPath = path.join(process.cwd(), './config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);

//let connection_file = config.connection_file;
let userName = 'admin';
let gatewayDiscovery = config.gatewayDiscovery;
let appAdmin = config.appAdmin;
let orgMSPID = config.orgMSPID;

//Read the connection file
const ccpPath = path.join(process.cwd(), './fabric_connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);


const util = require('util');

exports.connectToNetwork = async function (userName) {
  
  const gateway = new Gateway();

  try {
    const walletPath = path.join(process.cwd(), './wallet');
    const wallet = new FileSystemWallet(walletPath);
    //*console.log(`Wallet path: ${walletPath}`);
    //*console.log('userName: ');
    //*console.log(userName);

    //*console.log('wallet: ');
    //*console.log(util.inspect(wallet));
    //*console.log('ccp: ');
    //*console.log(util.inspect(ccp));
    //*console.log('before gateway.connect: ');

    await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery});
    
    //*console.log('gateway connected ');

    // Connect to our local fabric
    const network = await gateway.getNetwork('mychannel');
    

    //*console.log('Connected to mychannel. ');
    // Get the contract we have installed on the peer
    const contract = await network.getContract('SPgolangv4');


    let networkObj = {
      contract: contract,
      network: network,
      gateway: gateway
    };

    return networkObj;

  } catch (error) {
    //*console.log(`Error processing transaction. ${error}`);
    //*console.log(error.stack);
    let response = {};
    response.error = error;
    return response;
  } finally {
    console.log('Done connecting to network.');
    // gateway.disconnect();
  }
};

exports.invoke = async function (networkObj, isQuery, func, args) {
  try {
    //*console.log('inside invoke');
    //*console.log(`isQuery: ${isQuery}, func: ${func}, args: ${args}`);
    //*console.log(util.inspect(networkObj));
    

    // console.log(util.inspect(JSON.parse(args[0])));

    if (isQuery === true) {
      //*console.log('inside isQuery');

      if (args) {
        //*console.log('inside isQuery, args');
        //*console.log(args);
        //*console.log(typeof args);

        let response = await networkObj.contract.submitTransaction(func,args);
        //*console.log(response);
        //*console.log(`Transaction ${func} with args ${args} has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
        
      } else {

        let response = await networkObj.contract.submitTransaction(func);
        //*console.log(response);
        //*console.log(`Transaction ${func} without args has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
      }
    } else {
      //*console.log('notQuery');
      if (args) {
        //*console.log('notQuery, args');
        //*console.log('$$$$$$$$$$$$$ args: ');
        //console.log(args[0]);
        //console.log(func);
        //*console.log(typeof args);

        //args = JSON.parse(args);

        //*console.log(util.inspect(args));
        //args = JSON.stringify(args);
        //*console.log(util.inspect(args));

        //*console.log('before submit');
        //*console.log(util.inspect(networkObj));
        let response = await networkObj.contract.submitTransaction(func, args);
        //*console.log('after submit');

        //*console.log(response);
        //*console.log(`Transaction ${func} with args ${args} has been submitted`);
  
        await networkObj.gateway.disconnect();
  
        return response;


      } else {
        let response = await networkObj.contract.submitTransaction(func,args);
        //*console.log(response);
        //*console.log(`Transaction ${func} with args has been submitted`);
  
        await networkObj.gateway.disconnect();
  
        return response;
      }
    }

  } catch (error) {
    //*console.error(`Failed to submit transaction: ${error}`);
    return error;
  }
};

exports.invoke1 = async function (networkObj, isQuery, func, arg1, arg2, arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12) {
  try {
    //*console.log('inside invoke');
    //*console.log(`isQuery: ${isQuery}, func: ${func}`);
    //*console.log(util.inspect(networkObj));
    

    // console.log(util.inspect(JSON.parse(args[0])));


        //*console.log('inside not Query, args');
        //*console.log(arg1);
        //*console.log(typeof arg1);

        let response = await networkObj.contract.submitTransaction(func,arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10,arg11,arg12);
        //*console.log(response);
        //*console.log(`Transaction ${func} with args ${arg1} has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
        
    }catch (error) {
    //*console.error(`Failed to submit transaction: ${error}`);
    return error;
     }
};

exports.invoke2 = async function (networkObj, isQuery, func, arg1, arg2) {
  try {
    //*console.log('inside invoke');
    //*console.log(`isQuery: ${isQuery}, func: ${func}`);
    //*console.log(util.inspect(networkObj));
    
    // console.log(util.inspect(JSON.parse(args[0])));

        //*console.log('inside not Query, args');
        //*console.log(arg1);
        //*console.log(typeof arg1);

        let response = await networkObj.contract.submitTransaction(func,arg1,arg2);
        //*console.log(response);
        //*console.log(`Transaction ${func} with args ${arg1} and ${arg2} has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
        
    }catch (error) {
    //*console.error(`Failed to submit transaction: ${error}`);
    return error;
     }
};

exports.invoke4 = async function (networkObj, isQuery, func, arg1, arg2, arg3, arg4) {
  try {
    //*console.log('inside invoke');
    //*console.log(`isQuery: ${isQuery}, func: ${func}`);
    //*console.log(util.inspect(networkObj));
    

    // console.log(util.inspect(JSON.parse(args[0])));


       //*console.log('inside not Query, args');
       //* console.log(arg1);
       //* console.log(typeof arg1);

        let response = await networkObj.contract.submitTransaction(func,arg1,arg2,arg3,arg4);
        //*console.log(response);
        //*console.log(`Transaction ${func} with args ${arg1} has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
        
    }catch (error) {
    //*console.error(`Failed to submit transaction: ${error}`);
    return error;
     }
};

exports.invoke3 = async function (networkObj, isQuery, func, arg1, arg2, arg3 ) {
  try {
    //*console.log('inside invoke');
    //*console.log(`isQuery: ${isQuery}, func: ${func}`);
    //*console.log(util.inspect(networkObj));
    

    // console.log(util.inspect(JSON.parse(args[0])));


       //*console.log('inside not Query, args');
        //*console.log(arg1);
        //*console.log(typeof arg1);

        let response = await networkObj.contract.submitTransaction(func,arg1,arg2,arg3);
        //*console.log(response);
        //*console.log(`Transaction ${func} with args ${arg1} has been evaluated`);
  
        await networkObj.gateway.disconnect();
  
        return response;
        
    }catch (error) {
    //*console.error(`Failed to submit transaction: ${error}`);
    return error;
     }
};