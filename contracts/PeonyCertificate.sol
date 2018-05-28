pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
// References: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.8.0/contracts/token/ERC721/ERC721Token.sol

contract PeonyCertificate is ERC721Token ("Peony", "PNY") {
    // These two are included in the open lib
    string internal name_ = "Peony";
    string internal symbol_ = "PNY";

    uint256 valid = 1;
    uint256 invalid = 0;
    uint256 tokenId = 1; // default tokenId for helping people to create unique id

    // our additional attirbutes for Issuer
    // Mapping from token ID to index of the issuer's issued tokens list
    mapping(uint256 => uint256) internal issuedTokensIndex;

    // Mapping from issuer to list of issued token IDs
    mapping (address => uint256[]) internal issuedTokens;

    // Mapping from token ID to issuer
    mapping (uint256 => address) internal tokenIssuer;

    // Mapping from token ID to Expiration time
    mapping (uint256 => uint) internal certificateExpirationTime;

    // Mapping from token ID to Valid Cert
    // mapping (uint256 => uint256) internal certificateIsValid;

    // Mapping from address to lockdown  (for account getting hacked, 
    // so owner will have ability to 'lock down' the account)
    mapping (address => bool) internal lockedDownAddresses;

    // constructor
    function PeonyCertificate() public { 

    }

    
    modifier onlyUnlocked() {
        require(!lockedDownAddresses[msg.sender]);
        _;
    }
    
    // Function to issue certificate to a receiver
    // _uri  : The JSON string data that we will put in certificate
    function IssueCertificate(address _to, string _uri) onlyUnlocked public {
        this.IssueCertificate(_to, _uri, 0);
    }

    // OverLoaded function for regression

    function IssueCertificate(address _to, string _uri, uint256 expirationTime) onlyUnlocked public {
        uint256 newTokenId = tokenId++;
        super._mint(_to, newTokenId);
        super._setTokenURI(newTokenId, _uri);
        // Update issuer data and Addition Peony Features
        uint256 issuerLength = issuedTokens[msg.sender].length;
        issuedTokens[msg.sender].push(newTokenId);
        issuedTokensIndex[newTokenId] = issuerLength;
        tokenIssuer[newTokenId] = msg.sender;
        // Add expireationTime stamp
        certificateExpirationTime[newTokenId] = expirationTime;
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
        removeTokenFrom(msg.sender, tokenId);
    }

    // Function to check is a certificate is valid, now only check time
    function isCertificateValid(uint256 tokenId) public view returns(uint256 valid) {        
        uint256 expirationTime = certificateExpirationTime[tokenId];        
        if (now > expirationTime && expirationTime != 0) {
            return valid;
        } else {
            return invalid;
        }        
    }
     
}
