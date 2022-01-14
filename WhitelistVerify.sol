// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract WhitelistVerify is Ownable {
  using MerkleProof for bytes32[];

  bytes32 public rootHash;

  function isWhitelisted(address addr, bytes32[] memory proof) external view returns (bool) {
    return checkAddress(addr, proof);
  }

  function checkAddress(address addr, bytes32[] memory proof) private view returns (bool) {
    require(
      proof.verify(rootHash, keccak256(abi.encodePacked(addr))),
      'Address is not whitelisted'
    );

    return true;
  }

  function setRootHash(bytes32 hash) external onlyOwner {
    rootHash = hash;
  }
}
