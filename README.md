# CS359B Project Peony Blockchain Certificate  
A multi-purposes certificate contract platform on ethereum 

- Platform will be called as Peony
- Token will be named "Petal"  with symbol of "PTL"
    - TA mentioned Non-fungible tokens, we can also treat the certificate as tokens depending on the contract

## Technologies used

* Solidity
* Rruffle
* ERC 721
* Drizzle

## Istallation intructions

- To deploy
    -http://truffleframework.com/tutorials/deploying-to-the-live-network

- If you're having problem on testing the project on browser...
	Make sure you're MetaMask is running on same port number (Ganache: 7454)

	more to add ..

- npm install antd --save

## More Features
    
    
- Add the feature to approve / deny the token teansfer.
  Ex: deny degree transfer, approve membership transfer

- Expiration 
  can be implement in front end to avoid overhead.

  more to add ..
 
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



