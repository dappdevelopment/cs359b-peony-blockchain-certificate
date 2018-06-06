pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

import "./lib/strings.sol";
// References: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.8.0/contracts/token/ERC721/ERC721Token.sol

contract PeonyCertificate is ERC721Token ("Peony", "PNY") {
    using strings for *;
    using SafeMath for uint256;

    // These two are included in the open lib
    string internal name_ = "Peony";
    string internal symbol_ = "PNY";

    uint256 erc721TokenId = 1; // default tokenId for helping people to create unique id

    // our additional attirbutes for Issuer
    // Mapping from token ID to index of the issuer's issued tokens list
    mapping(uint256 => uint256) internal issuedTokensIndex;

    // Mapping from issuer to list of issued token IDs
    mapping (address => uint256[]) internal issuedTokens;

    // Mapping for issuer to know how many certificates it has issued
    mapping (address => uint256) internal issuedTokensCount;

    // Mapping from token ID to issuer
    mapping (uint256 => address) internal tokenIssuer;

    // Mapping from token ID to Expiration time
    mapping (uint256 => uint256) internal certificateExpirationTime;

    // Mapping for indicating if the token is revokable or not.
    mapping (uint256 => bool) internal revokableCertificates;

    // Mapping for indicating if the token is revoked or not.
    mapping (uint256 => bool) internal isCertificateRevoked;

    // Mapping from token ID to Valid Cert
    // mapping (uint256 => uint256) internal certificateIsValid;

    // Mapping from address to lockdown  (for account getting hacked, 
    // so owner will have ability to 'lock down' the account)
    mapping (address => bool) internal lockedDownAddresses;

    struct Signer{
        string name;
        address signerAddr;
        string signature;
        uint256 dateSigned;
    }

    // Mapping tokenId to Signer index in TokenSignersList 
    mapping (uint256 => mapping(address => uint256)) TokenSignersIndex;

    // Mapping to a list of signers
    mapping (uint256 => Signer[]) TokenSignersList;

    // constructor
    function PeonyCertificate() public { 
        //Do some initialization
    }

    
    modifier onlyUnlocked() {
        require(!lockedDownAddresses[msg.sender]);
        _;
    }

    // OverLoaded function for regression
    function IssueCertificateOld(address _to, string _uri, uint256 expTime) onlyUnlocked public {
        this.IssueCertificate(_to, _uri, expTime, new address[](0), "", false);
    }

    // Function to issue certificate to a receiver
    // _to   : The recipient's wallet address
    // _uri  : The JSON string data that we will put in certificate
    // expirationTime  : The time of expiration
    // signAddr : The list of addresses to be the signer of the certificate (those signer will need to get on and sign it individually later on)
    // names  : The names of the signers (is ';' delimetered string)
    function IssueCertificate(address _to, string _uri, uint256 expirationTime, address[] signAddr, string names, bool revokable) 
    onlyUnlocked public {
        //New generated token Id
        uint256 newTokenId = erc721TokenId++;
        super._mint(_to, newTokenId);
        super._setTokenURI(newTokenId, _uri);
        // Update issuer data and Addition Peony Features
        isCertificateRevoked[newTokenId] = false; //new certificate always has not yet been revoked
        uint256 issuerLength = issuedTokens[msg.sender].length;
        issuedTokens[msg.sender].push(newTokenId);
        issuedTokensIndex[newTokenId] = issuerLength;
        tokenIssuer[newTokenId] = msg.sender;
        issuedTokensCount[msg.sender] = issuedTokensCount[msg.sender].add(1);
        // Add expireationTime stamp
        certificateExpirationTime[newTokenId] = expirationTime;
        // Get names ready to be split by strings.sol
        strings.slice memory sliceName = names.toSlice();
        strings.slice memory delim = ";".toSlice();
        // Add signers to the token list
        for(uint256 i = 0 ; i < signAddr.length ; i++){
            //share the referneces so can share the same updates actions
            TokenSignersList[newTokenId].push(Signer(sliceName.split(delim).toString(), signAddr[i], "", 0));
            TokenSignersIndex[newTokenId][signAddr[i]] = i; 
        }
        //populate map for revokable list
        revokableCertificates[newTokenId] = revokable;
    }

    //IssuedTokens getter by tokenId
    function getTotalIssuedTokens(address _issuer) public view returns(uint256 total){
        return issuedTokensCount[_issuer];
    }

    //Get IssuedTokensByIssuerIndex
    function tokenOfIssuerByIndex(address _owner, uint _index) public view returns(uint256 tokenId){
        require(_index < getTotalIssuedTokens(_owner));
        return issuedTokens[_owner][_index];
    }

    //For signer to find a particular tokenId and sign the certificate
    function signCertificate(uint256 tokenId, string signature, uint dateSigned) onlyUnlocked public {
        //signatures[tokenId][msg.sender] = signature;
        uint256 index = TokenSignersIndex[tokenId][msg.sender];
        require(index < TokenSignersList[tokenId].length);
        require(TokenSignersList[tokenId][index].signerAddr == msg.sender);
        TokenSignersList[tokenId][index].signature = signature;
        TokenSignersList[tokenId][index].dateSigned = dateSigned;
    }

    //Get total number of signer
    function getNumberOfSigners(uint256 tokenId) public view returns(uint256 numberOfSigners) {
        return TokenSignersList[tokenId].length;
    }

    //Get signature from certificate signers list
    function getSignature(uint256 tokenId, uint256 index) public view returns(string signature){
        return TokenSignersList[tokenId][index].signature;
    }

    //Get Signer Object from certificate signers list by index
    function getSigner(uint256 tokenId, uint256 index) public view 
    returns(string name, address signerAddress, string signature, uint256 dateSigned){
        Signer memory signer = TokenSignersList[tokenId][index];
        return (signer.name, signer.signerAddr, signer.signature, signer.dateSigned);
    }


    // Get Issuer address from provided tokentId
    // 0: meaning the tokenId doesn't have mapped Issuer Address (more likely there is no such token)
    function GetIssuerAddressByTokenId(uint256 tokenId) public view returns(address Issuer) {
        return tokenIssuer[tokenId];
    }

    // Get Issuer address from provided tokentId
    // 0: meaning the tokenId doesn't have mapped Issuer Address (more likely there is no such token)
    function GetExpirationTimeByTokenId(uint256 tokenId) public view returns(uint256 expirationTime) {
        return certificateExpirationTime[tokenId];
    }

    // Emergency kill button for issuer
    // When user's private key is stolen, so user can lock the account so it won't be able to issue any more certificates
    function lockAccount() onlyUnlocked public {
        lockedDownAddresses[msg.sender] = true;
    }

    // Helper view function to check if the account is locked
    function isAccountLocked() public view returns(bool locked){
        return lockedDownAddresses[msg.sender];
    }

    // Function to remove token from owner  for allowing users to remove unwanted certificates
    function deleteCertificate(uint256 tokenId) onlyUnlocked public{
        super.removeTokenFrom(msg.sender, tokenId);
    }
     
    // Function to revoke the certificate
    // Has to be the issuer and the certificate is revokable.
    function revokeCertificate(uint256 tokenId) onlyUnlocked public{
        require(revokableCertificates[tokenId] == true);
        require(tokenIssuer[tokenId] == msg.sender);
        //Set revoked flag to true
        isCertificateRevoked[tokenId] = true;
    }

    // Check if the certificate has been revoked or not
    function isCertificateRevokedByIssuer(uint256 tokenId) public view returns(bool revoked){
        return isCertificateRevoked[tokenId];
    }
     // Check if the certificate has been revoked or not
    function isCertificateRevokable(uint256 tokenId) public view returns(bool revokable){
        return revokableCertificates[tokenId];
    }
    //Helper function to return if certificate is valid
    //Currently only verify if the certificate is revoke or not.
    function isCertificateValid(uint256 tokenId) public view returns(bool valid){
        bool isValid = true;
        isValid = isValid && !isCertificateRevoked[tokenId];  //check if the certificate is revoked or not
        return isValid;
    }
}
