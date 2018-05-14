pragma solidity ^0.4.18;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
// References: https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v1.8.0/contracts/token/ERC721/ERC721Token.sol

contract PeonyCertificate is ERC721Token ("Peony", "PNY") {
    // These two are included in the open lib
    string internal name_ = "Peony";
    string internal symbol_ = "PNY";
    uint256 tokenId = 1; // default tokenId for helping people to create unique id

    // our additional attirbutes for Issuer
    // Mapping from token ID to index of the issuer's issued tokens list
    mapping(uint256 => uint256) internal issuedTokensIndex;

    // Mapping from issuer to list of issued token IDs
    mapping (address => uint256[]) internal issuedTokens;

    // Mapping from token ID to issuer
    mapping (uint256 => address) internal tokenIssuer;
    
    // constructor
    function PeonyCertificate() public { 

    }
    function debug() public view returns(uint){
        return tokenId;
    }
    
    // Function to issue certificate to a receiver
    // _uri  : The JSON string data that we will put in certificate
    function IssueCertificate(address _to, string _uri) public {
        uint256 newTokenId = tokenId++;
        super._mint(_to, newTokenId);
        super._setTokenURI(newTokenId, _uri);
        // Update issuer data
        uint256 issuerLength = issuedTokens[msg.sender].length;
        issuedTokens[msg.sender].push(newTokenId);
        issuedTokensIndex[newTokenId] = issuerLength;
        tokenIssuer[newTokenId] = msg.sender;
    }
}
