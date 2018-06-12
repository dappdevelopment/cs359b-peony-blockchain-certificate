


# Peony Blockchain Certificate  



<img src="https://i.imgur.com/lp6iruo.jpg" width="1000">



## Description of the dapp

People might lie about having certificates. Also, schools, governments or any entity want to mitigate fraudulent certificates. We create a platform allowing schools or governments to issue certificates, making the certificates credible in a transparent and frad-preventing way.



## Workflow

Bob wants to hire potential employee Alice who just graduated from Stanford, and he wants to verify her diploma. After Alice sends Bob her contract address, Bob verify that is the address of issuer match to Stanford’s public address. If they match, Alice’s diploma is verified.



<img src="https://i.imgur.com/9JnFjyw.jpg" width="800">







## Future work
Peony will extend and become not only a educational certificate platform, but a general service platform that supports vehicle license plates, tickets, membership, and even ownship documents. 






## Q & A
1. Why webpage only shows baby fox face :( ?
    **You will need to install Metamask plugin for your browser**
3. Why the page is not showing homepage but asking me to switch to Rinkeby?
    **You will need to switch your network in Metamask to Rinkeby**
5. 
6. d
7. f
8. g
9. h



## Functionality: describe features of your dapp, with explanations of non-obvious ones
- issue certificates to everyone
    - type in basic info for certificates, including title, content, expiration date, revokability, requested signer
    - upload certificate background
    - upload badge background
- multi-sign a contract
- verify certificates using contract addresses
    - by typing in the contract address, user can view the specified certificate
    - if the user is the requested signer of the contract, he/she will be asked to sign the contract 
- view our own certificates with background and badge specified by the issuer
- view issued contract
    - revoke unwanted certificates
- block unwanted wallet address in case the private key is stolen


## Implementation / Technical architecture. (Describe the technical architecture of your dapp. This depends on your dapp, so we will not give you specific questions to answer. Example questions are below.)
### Technical challenges and solutions experienced and solved
### What data is stored on the blockchain, and what functionality lives on the blockchain? What is off-chain?



### Describe the components of the project (e.g. web front end, database, smart contracts, other contracts, external services, oracles, etc.). How do they all fit into place?
### Feasibility analysis (does this service make sense, e.g. storage and gas costs)

## Other essential considerations (e.g. privacy, scalability)

## Future work directions. Do you plan to work on it? Any interest from investors? ICO plans? Airdrops? We would love to hear.






## Technologies used

* Solidity
* Truffle
* ERC 721
* Drizzle

## Installation intructions

- To deploy
    -http://truffleframework.com/tutorials/deploying-to-the-live-network

- If you're having problem on testing the project on browser...
  Make sure you're MetaMask is running on same port number (Ganache: 7454)


- npm install antd --save

## More Features
    
    
- Add the feature to approve / deny the token teansfer.
  Ex: deny degree transfer, approve membership transfer

- Expiration 
  can be implement in front end to avoid overhead.

- Revoke
- Multi-Signers
 
 ## Deployment Steps

 ### Steps for if it is needed to re-deploy contract on blockchain
 1. The way we use in truffle.js is using Infura API (which is a handy service that allow us to deploy like Geth but without having actual geth and a full synced node)
 2. First get a passphrase of the wallet account (the one for deploy)  (We will secretly share the wallet secret phrase offline (NEVER PUSH PASSPHRASE to git/public domain))
 3. Under truffle.js  modify the variable ```passphrase``` from ```<secret passphrase of the deployment wallet>``` to proper passphrases (ex: betray apple car newyork ...)
 4. Run ```truffle compile```
 5. Run ```truffle migrate --network rinkeby``` (Make sure the wallet you use in step 3. has enough Eth to deploy the contract, otherwise it will fail)
 6. Wait the process to complete.
 7. To verify the deployment of the contract in ```build/contracts/<target contract>``` (Same as the teacher's instructions) that ```"networks"``` has proper values set in (address, txn hashes, network ids ...etc)
 8. Done

 ### Steps for rebuilding js codes
 1. Go to root directory of the project
 2. Run ```npm run build```
 3. Once build file is generated in ```build_webpack/``` foler
 4. Copy the the whole folder to the server (root directory or the sepcified directory)  ```scp -r ./build_webpack/ peony@dapps.nofaults.org:~/cs359b-peony-blockchain-certificate``` (For our class: ```/home/peony/cs359b-peony-blockchain-certificate```)
 5. Done

 ### Connecting the server
 1. ssh into the server ```ssh peony@dapps.nofaults.org```
 2. scp to the root directory: ```scp [file path] peony@dapps.nofaults.org:~/cs359b-peony-blockchain-certificate```



## Material Design Used In This Project
1. antd: https://ant.design/
    - Input, Radio, Card, Col, Row, Layout, Alert, message, Button, Menu, Icon, Search
2. Toggle: https://developer.microsoft.com/en-us/fabric
3. DatePicker: https://www.npmjs.com/package/react-datepicker
4. moment: https://momentjs.com/
5. Input, Radio from antd
6. AccountData, ContractData, ContractForm: https://github.com/trufflesuite/drizzle-react-components
7. drizzleConnect: https://github.com/trufflesuite/drizzle-react
8. React, Component: https://reactjs.org/
9. PropTypes: https://www.npmjs.com/package/prop-types
10. _: http://underscorejs.org/


## Layout for tokenURI JSON string
```
{
 "ReceipientName": "Hans", 
 "IssuerName":"Stanford",
 "Title":"St. Petershrb College",
 "Body": "This is a testing diploma granted for Hans",
 "CertificateBackGroundURL":"www.abc.com",
 "BadgeURL": "www.badget.com",
 "SignersNames" : [
       "Peter, Principle", 
       "Ron, Professor"
  ]
}
```
## Time unit
Time unit is (ns) 
NOT ms





A certificate contract platform on ethereum 





