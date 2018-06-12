# Peony Blockchain Certificate  


<img src="https://i.imgur.com/lp6iruo.jpg" width="1000">


## Description of the dapp
A certificate contract platform on ethereum.

People might lie about having certificates. Also, schools, governments or any entity want to mitigate fraudulent certificates. We created a platform allowing schools or governments to issue certificates, making the certificates credible in a transparent and frad-preventing way. You own your certificates at one place, and you decide whom and when to share them with. Own and Share Your Achievements!


## Global Problem: Fake Certificare
- Multi-million dollar fake degree industry

- Re-recruitment costs billions dollar worldwide

- Background checks are increasingly common
  - Expensive, employers pay
  - Slow, delay start time


<center><img src="https://i.imgur.com/6CvZ48W.png" width="400"></center>


## Solution: Blockchain. Why?

<img style="float: right;" src="https://i.imgur.com/oVhqwXp.png" width="200">

 - Decentralized, Secure, Interoperable etc.

 - Efficient, Easy Verification

 - Zero cost to employers and employees

 - Life-long learning credentials, one place

 - You own your certificates



## Workflow & Example Usecase
Bob wants to hire potential employee Alice who just graduated from Stanford, and he wants to verify her diploma. After Alice sends Bob her contract address, Bob verify that is the address of issuer match to Stanford’s public address. If they match, Alice’s diploma is verified.


<img src="https://i.imgur.com/9JnFjyw.jpg" width="800">


## Features
- Issue
    - Issue certificates to everyone
    - Type in basic info for certificates, including title, content, expiration date, revokability, requested signer
    - Upload certificate background
    - Upload badge background

- Sign
    - Sigle Person Signing
    - Multi-Sign
        - A contract can be signed by many people
        - Harfer to hack if one of the signer is compromised  
    - Signing Request Sending    
        - Once the user is the requested signer of the contract, he/she will be asked to sign the contract 
        - You can sign or decline w/o comment

- Verification
    - Verify certificates using contract addresses
    - Type in the contract address, user can view the specified certificate
    
- View    
    - View our own certificates with background and badge specified by the issuer
    - View issued contract
    
- Safety
    - Revoke
        - revoke unwanted certificates
    - Blocking
        - Block unwanted wallet address in case the private key is stolen

- Privacy 
    - More to come


## FAQ
1. Why webpage only shows baby fox face :( ?
    **You will need to install Metamask plugin for your browser**
2. Why the page is not showing homepage but asking me to switch to Rinkeby?
    **You will need to switch your network in Metamask to Rinkeby**
3. Why do we need this?
    **Decentralization allows our community to remove trust party (third party) away from our current workflow and imporve overall efficiency.**
4. Do I have to pay for this?
    **This platform is a form of Pay-Per-Use Software, so the users that writes blockchain will need to pay gas.**
5. What if I don't want a contract anymore?
    **(Coming Soon) Users will have their ability to remove the certificate from their list**
6. Is my certificates secure?
    **Depends on how you protect your private key :)**
7. How about privacy?
    **The information on the Blockchain is public, unless you hashed the data. In this case, you can save certificate in the form of hashed text, and later ask verifiers to verify the hash text from the actual plain text certificate you send them.**
8. Will you add tokens?
    **YES**
9. How is this different from a University having a searchable repository of graduates?
    **1. Having a centralize (University) to host a searchable database for people, the expense of maintaining the server will also be centralize to one single entity. Someone will have to pay for the expense either students or schools**
    **2. This question is based on one assumption, that the insitute still exist/running by the time of verification**
    **3. What if University becomes CollegeBoard in the upcoming years? (Every query for certificate will charge you 15$)**
10. What if I lost my private key?
    **Oops...**
11. What if my private key is stolen?
    **You can block your account using the lock account button on our app, and your address is no longer valid to issue certificate.**
12. I am a unversity. Why should I use Peony? Is it cheaper than the triditional diploma?
    **It will be cheaper for the traditional diploma, and cheaper on maintaining the whole historical graduates certificates**
13. I am an employer. Do I need to pay for this?
    **The verification costs you nothing! You save the money from performing background checks.**
14. I am an employee. Do I need to pay for this?
    **The verification process costs you nothing too!**
15. Feasibility analysis. Does this service make sense, e.g. storage and gas costs?
    **The gas cost is relatively cheaper than the original method.**
    


## Hacks


We used drizzle to handle the life cycle of loading contract data in front end, allowing data to display on the web front using react. Majority of the certificate data is stored on the blockchain. We used Drizzle store framework to load and cache blockchain data on client's machine. (It will not load the whole system's data, but only the data that user needs)

Nowadays, the middle men charges excessive amount for just providing a minimum services (i.e. ETSGRE charges 27$ and CollegeBoard charges 12$ for every single school you send). This service will create a new revolution to our existing system that we will no longer need a third party trust group to verify any certificate. To keep this project as **Decentralized** as possible, we try to avoid using centralize cache database and oracles infrastructures. Majority of our project are consiste of web front end, smart contracts, and openzeppelin contracts library.


### Built with
* Solidity
* Truffle
* ERC 721
* Drizzle
* React
* Promise framework


### With inspiration from:
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


### Layout for tokenURI JSON string
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


### Time unit
Time unit for this project is based on nano-second(ns) 
**NOT milliseconds**


### Installation intructions
- To deploy
    -http://truffleframework.com/tutorials/deploying-to-the-live-network

- If you're having problem on testing the project on browser...
  Make sure you're MetaMask is running on same port number (Ganache: 7454)

- npm install


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


<img src="https://i.imgur.com/j7O1GXx.jpg" width="100">

## Future work
Peony will extend and become not only a educational certificate platform, but a general service platform that supports vehicle license plates, tickets, membership, and even ownship documents. And yes, we did get some inteinterests from investors, exciting journey indeed!
