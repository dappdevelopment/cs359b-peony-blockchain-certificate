pragma solidity 0.4.21;

contract SimpleStorage {
  event StorageSet(
    string _message
  );

  uint public storedData;

  function set(uint x) public {
    storedData = x;

    StorageSet("Data stored successfully!");
  }
}
