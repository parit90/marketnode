import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils'; // Import AbiItem type
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config(); // Load environment variables from .env file

@Injectable()
export class TokenService {
  private web3: Web3;
  private contract: Contract<AbiItem[]>; // Provide the ABI type

  constructor() {
    this.web3 = new Web3(process.env.ETHEREUM_URL || 'http://localhost:8545');

    // Load the ABI dynamically from the Hardhat artifacts
    const artifactPath = path.resolve(__dirname, '../../artifacts/contracts/ERC20Token.sol/ERC20Token.json');
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abi = artifact.abi;

    const address = process.env.CONTRACT_ADDRESS; // Get the contract address from the .env file
    this.contract = new this.web3.eth.Contract(abi as AbiItem[], address);
  }

  async getTokenInfo(): Promise<any> {
    const symbol = await this.contract.methods.symbol().call();
    const totalSupply = await this.contract.methods.totalSupply().call();
    const owner = await this.contract.methods.owner().call();

    return {
      symbol,
      totalSupply,
      owner,
    };
  }
}
