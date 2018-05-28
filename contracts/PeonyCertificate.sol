pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
// References: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.8.0/contracts/token/ERC721/ERC721Token.sol

contract PeonyCertificate is ERC721Token ("Peony", "PNY") {
    // These two are included in the open lib
    string internal name_ = "Peony";
    string internal symbol_ = "PNY";
    // string internal VV = "VVV";
    // string internal IV = "III";
    bytes32 public VV = "VV";
    bytes32 public II = "II";
    uint256 yes = 1;
    uint256 no = 0;
    uint256 erc721TokenId = 1; // default tokenId for helping people to create unique id
    //Decalre max length of the names to accept
    uint256 MAX_LENGTH = 100;
    // our additional attirbutes for Issuer
    // Mapping from token ID to index of the issuer's issued tokens list
    mapping(uint256 => uint256) internal issuedTokensIndex;

    // Mapping from issuer to list of issued token IDs
    mapping (address => uint256[]) internal issuedTokens;

    // Mapping from token ID to issuer
    mapping (uint256 => address) internal tokenIssuer;

    // Mapping from token ID to Expiration time
    mapping (uint256 => uint256) internal certificateExpirationTime;

    // Mapping from token ID to Valid Cert
    // mapping (uint256 => uint256) internal certificateIsValid;

    // Mapping from address to lockdown  (for account getting hacked,  so owner will have ability to 'lock down' the account)
    mapping (address => bool) internal lockedDownAddresses;

    struct Signer{
        byte[100] name;
        address singerAddr;
        string signature;
    }

    // Mapping tokenId to Signer Struct 
    mapping (uint256 => mapping(address => Signer)) TokenSigners;

    // Mapping to a list of signers
    mapping (uint256 => Signer[]) TokenSignersList;

    // constructor
    function PeonyCertificate() public { 

    }
    
    modifier onlyUnlocked() {
        require(!lockedDownAddresses[msg.sender]);
        _;
    }


    // OverLoaded function for regression
    function IssueCertificateOld(address _to, string _uri, uint256 expTime) onlyUnlocked public {
        this.IssueCertificate(_to, _uri, expTime, new address[](0), new byte[100][](0));
    }

    // Function to issue certificate to a receiver
    // _uri  : The JSON string data that we will put in certificate
    function IssueCertificate(address _to, string _uri, uint256 expirationTime, address[] signAddr, byte[100][] names) onlyUnlocked public {
        uint256 newTokenId = erc721TokenId++;
        super._mint(_to, newTokenId);
        super._setTokenURI(newTokenId, _uri);
        // Update issuer data and Addition Peony Features
        uint256 issuerLength = issuedTokens[msg.sender].length;
        issuedTokens[msg.sender].push(newTokenId);
        issuedTokensIndex[newTokenId] = issuerLength;
        tokenIssuer[newTokenId] = msg.sender;
        // Add expireationTime stamp
        certificateExpirationTime[newTokenId] = expirationTime;
        // Add signers to the token list
        for(uint256 i = 0 ; i < signAddr.length ; i++){
            TokenSigners[newTokenId][signAddr[i]] = Signer(names[i], signAddr[i], "");
            Signer storage t = TokenSigners[newTokenId][signAddr[i]];
            TokenSignersList[newTokenId].push(t); //share the referneces so can share the same updates actions
        }
    }

    //For signer to find a particular tokenId and sign the certificate
    function signCertificate(uint256 tokenId, string signature) onlyUnlocked public {
        //signatures[tokenId][msg.sender] = signature;
        TokenSigners[tokenId][msg.sender].signature = signature;
    }

    //Get total number of signer
    function getNumberOfSigners(uint256 tokenId) public view returns(uint256 numberOfSigners) {
        return TokenSignersList[tokenId].length;
    }

    //Get signature from certificate signers list
    function getSignature(uint256 tokenId, uint256 index) public view returns(string signature){
        return TokenSignersList[tokenId][index].signature;
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

    //Helper view function to check if the account is locked
    function isAccountLocked() public view returns(bool locked){
        return lockedDownAddresses[msg.sender];
    }

    //Function to remove token from owner  for allowing users to remove unwanted certificates
    function deleteCertificate(uint256 tokenId) onlyUnlocked public{
        removeTokenFrom(msg.sender, tokenId);
    }





    // function isCertificateValid(uint256 tokenId) public view returns(bool valid) {
    // function isCertificateValid(uint256 tokenId) public view returns(byte32 valid) {
    // function isCertificateValid(uint256 tokenId) public view returns(string valid) {
    function isCertificateValid(uint256 tokenId) public view returns(uint256 valid) {
        // expirationTime = GetExpirationTimeByTokenId(tokenId);
        uint256 expirationTime = certificateExpirationTime[tokenId];        
        if (now > expirationTime && expirationTime != 0) {
            // return "valid!";
            // return VV;
            return yes;
        } else {
            // return "invalid!";
            // return II;
            return no;
        }        
    }

     
}
