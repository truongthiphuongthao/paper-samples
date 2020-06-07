/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const common = require('fabric-common')
// const { BlockDecoder } = require('BlockDecoder')
const path = require('path');
const fs = require('fs');
var Marshal = require('marshal');


//exports.queryPaper = async function(mssv) 
async function main(blockID, dinhdanh){
   // let response = {}
    try {
        // load the network configuration
        //const ccpPath = path.resolve(__dirname, '..', '..','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccpPath = path.resolve(__dirname, '..', '..','first-network','connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(dinhdanh);
        if (!identity) {
            console.log(`An identity for the user "${dinhdanh}" does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: dinhdanh, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // console.log(network.channel)
        // Get the contract from the network.
        const contract = network.getContract('qscc');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        // console.log('=======> OK'   )
        const result = await contract.evaluateTransaction('GetChainInfo', "mychannel", blockID);
        // console.log('=======>', result)
        console.log(result);
        // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // console.log(common.BlockDecoder)
        return result

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        //response.error = error.message
       // return response
       // process.exit(1);
       return false;
    }
}
// let dinhdanh ='appUser';
// let mssv = 'B1609548';
// main(mssv,dinhdanh);
module.exports = main
/*async function temp(){
	// main('0', 'appUser')
    // let blk_bytes = await main('1', 'appUser')
    // let decoder = new BlockDecoder()
    // console.log()
    // console.log(blk_bytes.toString())
    let obj = new Marshal('RHVtZW1heQ==', 'base64')
    console.log(obj.parsed)
}*/

//temp()