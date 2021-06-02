# Welcome to Traceability Blockchain Prototype

## Introduction

This is the repository for traceability blockchain prototype. The repository has four folders. 

1. Tracegui includes the tracegui application. 
2. Traceapp includes the traceapi. 
3. External includes the code to access the traceapi.
4. The contract has the standardparts contract, 

## Installation

An example intallation is provided here. The installations were tested on Ubuntu server 20.04 with a configuration of 2 GB RAM. 

The prototype uses the Hyperledger Fabric 1.4. The detailed installation instructions is given in Hyperledger Fabric page(https://hyperledger-fabric.readthedocs.io/en/release-1.4/prereqs.html). First prerequisites, curl, docker, go, node.js and python to be installed.


Update the ubuntu 20.04 
```markdown
sudo apt-get update
sudo apt install curl
```

Ad user for traceability blockchain 
```markdown
sudo adduser buser
```
Login as buser abd install docker and docker-compose. Add the user to docker group.

```markdown
sudo apt-get -y install docker-compose
sudo usermod -aG docker $USER
```

The go programming language is installed and path variable is updated.

```markdown
wget -c https://dl.google.com/go/go1.12.17.linux-amd64.tar.gz | sudo tar -xzf
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin
```
Node.js is installed as recommended. 

```markdown
sudo apt-get install nodejs npm
```

If you are using older version of linux such as 16.04, then install python 2.7.

```markdown
sudo apt-get install python
sudo bash nodesource_setup.sh
sudo apt install nodejs
```
Check the versions of the prerequests.

```markdown
docker -v
docker-compose -v
go version
node -v
npm -v
```
It is advised to define an alternative user account for running the blockchain application.


Final step is downloading the Hyperledger Fabric 1.4 and samples.

```markdown
curl -sSL http://bit.ly/2ysbOFE | bash -s 1.4.11
```

We will take the first network as a baseline and install standard parts contract on the network. Easiest way is to update the default *startfabric.sh* in the first network folder.

1. Update the chaincode directory and name.
 
In line 17, update chaincode directory sparts.

Create a directory in the chaincode folder named sparts and copy the SPgolangv4 contract to the directory. 

```markdown
CC_SRC_PATH=github.com/chaincode/sparts
```
In line 64,90 and 112 update chaincode name from fabcar to SPgolangv4 so that the chaincode is installed and instantiated.

2. Use leveldb for performance optimization. Update line 46.

```markdown
echo y | ./byfn.sh up -a -n 
```

3. If you want to add additional peers, create the cyrpto material, paste them and install the chaincode on these.

If you are using default port for web requests (https), sign in as root and enable node to access to default ports(80 and 443).

```markdown
setcap 'cap_net_bind_service=+ep' /usr/bin/node
```

## Prototype Architecture
The prototype has three main components. The traceapi is a node.js application. Ideally every organization runs a copy of their api. The blockchain api uses wallet and blockchain network configuration to access the blockchain. In the current configuration organizational wallet is included in the api. The tracegui is a vuetify application and calls the api functions.

1. Run the blockchain network and install the standard parts contract.
2. Run the api server.
3. Run the client application.

For running the blockchain network the first-network example is used as a baseline. The  contract is updated with standardparts(SPgolangv4.go). Do the installation steps, download the fabric samples, update the contract file in the contract directory and update the installation script *startfabric.sh*.

First run the script to form the blockchain script. Then enroll the administrator for the first organization in the blockchain. After the enrollment copy the admin wallet configuration.

```markdown
./startfabric.sh up
node enrolladmin.js
```
After the enrollment copy the admin wallet configuration. Update the wallet folder in the server directory of the application. The traceapp will use this credentials to access organization peer and call transactions.

Now we can start the traceapp. Go to server directory and and start server.

```markdown
npm install
npm start
```

Then build and start the tracegui web application. 

```markdown
npm install
npm run serve
```

Finally check the application from the you browser. The initial three parts that exist in the initial contract can be observed. 

```markdown
https://wwww.itopp.nl/ORG1
```

## The Scenario

The scenario is run on a presinstalled tracegui, traceapp and blockchain[itopp.nl/ORGID](itopp.nl/ORG1). See external access for calling api from python by connecting server [partsledger.tk/transactionname](partsledger.tk/queryAllTRU).


### Organizations

The network conssists of a manufacturer, third party logistics companies(3PL), distributer and maintanence&repair(M&R) organization. 

Manufacturer: Manufacturer is an OEM that produces parts for the market. When the parts are produced, the GTIN is recorded that includes the manufacturer ID.

Distributor: Distributor gets parts from the market, mostly manufacutrers, and sells them to the other parties.

3PL: 3PLs also buys and sells the parts. Additionally they can perform maintenance work on the parts and install them.

MRO: MRO organizations installs parts on the aerospace systems.

As new organizations are added thay are included in the blockchain and assigned a unique ORGID. Organizations have certificates.

For the tutorial example, we work on a network with six organizations.



![image](/assets/images/blockchainorgs.jpg)


### Traceable Resource Unit (TRU)

Each traceable part grouping is called a Traceable Resource Unit(TRU) and identifiable by a unique id(TRUID) assigned in the blockchain. The summary of the data tables and relations can be explained as follows:

-Each TRU is unique and corresponds to physical batch. TRU information can be aupdated by the owner organization.
-The history of changes of TRU information is stored in the TRACE entries. The organizations can only update the TRACE information for the TRU they own.
-When TRU is shipped, the change of ownership is allowed. The new owner can get the ownership. The old TRACE is copied to new owner. 

The TRU and TRACE data tables is provided below.

```markdown
![image](/assets/images/truandtrace.jpg)
```

### Interacting with the Blockchain: User Interface, API and Transactions

The user can submit transactions either through user interface or through API. Use interface provides user a contextual view of the information. The user interface calls the same API.

In the context of single organization two main interfaces exist in the interface. One for listing the TRUs in the system and one for listing the TRACE of a particular TRU. The specific functions on each screen is listed below. Each transaction is explained further in the transactions sections.

![image](/assets/images/list.jpg)

By clicking trace one can enter the trace interface.

![image](/assets/images/trace.jpg)


We can further explain each operation in the next section. 

**Operations on Parts as Transactions**

*Creation*
TRU can be produced and registered ideally by a manufacturer. After manufacturing and testing, it is registered to blockchain.  A TRU can be created with the GTIN(producer-productnumber combination), quantitry, CoC and batchnumber combination.

![image](/assets/images/create.jpg)


*Internal Operations*

Internal operations are provided by the owner of the TRU.

![image](/assets/images/maintenance.jpg)

If TRU is maintained the appropriate CoC is appended with the maintenance CoC.

![image](/assets/images/update.jpg)

If TRU is used the quantity of TRU is updated.

![image](/assets/images/use.jpg)

If TRU is used the quantity of TRU is updated.

![image](/assets/images/split.jpg)

The TRU batch can be splitted as to provide different destinations for each batch. The quantity of the new batch is specified. 

*Boundary Operations*

Boundary operations are performed during the change of ownership of TRU. These are ship and changeownership operations. 

When a part is shipped, following operations are performed.

![image](/assets/images/handoverTRU.jpg)

1. The buyer organization is selected and payment term is selected. This is done via ship transaction.
2. After the ship transaction is completed, a QR code is generated for the buyer to scan. This links to the page displaying trace and link to ownership change transaction.
3. The buyer scans the QR code. The trace is displayed and link to ownership change transaction.
4. The buyer confirms terms and ownership change. TRU is updated and a new set of trace entries are created for the buyer.

*Dispute Management*

Dispute transaction is used for dispute management. 

![image](/assets/images/dispute.jpg)

![image](/assets/images/respond.jpg)


### Use Case 1: Back-to-Birth Trace

You can see the trace of a for the M&R organization. It includes every operation the part has gone through from naufacturing. THe TRUIDs and GTINs are preserved through the trace. The CoC informations is only appended.


### Use Case 2: Dispute Resolution through Consistent/Trusted Common Trace

The trace data for TRU6 for 3PL and MRO  trace  is shown respectively. So the 3PL trace is the same as the trace of MRO organization accept the latest operations done by the lates owner. Every organization in the blockchain has a consistent view of the trace.

Whenever a dispute is started by an organization, the counter party has the same view of the disputed information as dispute party. 

### Use Case 3: Access Controlled Trace Data

The trace data can be modified by the owner organization and not the others. Upon shipping, only getOWN transaction can be called first. After this trace data is owned and modified by the current owner only. 

### Use Case 4: Payment Notice 

The payment period starts as soon as the ownership of a TRU is assumed. 

This has additional use cases such as:

1. Payment date can be reminded by an event sent to the current owner.

2. The owner may be limited to internal transactions or ship transactions if the payment terms are not met. 

3. Payment performance of the buyer can be precisely evaluated as it is done at the delivery.

4. The payment can be automated by another smart contract.


### API Requests

Examples of web api requests are provided for each operation.


We provide sample code for aceesing blockchain from Python.

```markdown

```


## Contact
Please contact [contact support](u.eryilmaz@tue.nl) for your problems.
