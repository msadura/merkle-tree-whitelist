import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';

const WHITELIST = [
  // Your whitelisted addressess
  '0xb1beb794209bf75Dc03F992CD86184676a566C47',
  '0x8ddeB3FF0c2f33e51A4d0405f060e52EccDEaD76',
  '0x7957bF3A045b0FD356FF6DC33B44E15089549d04',
  '0x681A39F1a2cFF5b17799fDd9930C2a8cED48f290'
];

export const isWhitelisted = (address: string) => {
  return WHITELIST.findIndex((addr) => addr.toLowerCase() === address.toLowerCase()) > -1;
};

export const getLeafNodes = () => WHITELIST.map((addr) => keccak256(addr));

export const getMerkleTree = () => {
  const leafNodes = getLeafNodes();
  const tree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  return tree;
};

// Hex root to be set in WL contract
export const getHexRoot = () => getMerkleTree().getHexRoot();

// Hex proof to be send in mint params
export const getHexProof = (address: string) => getMerkleTree().getHexProof(keccak256(address));
