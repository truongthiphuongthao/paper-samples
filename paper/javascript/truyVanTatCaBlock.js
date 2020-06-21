/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
// const nw = require('fabric-network');
const { Gateway, Wallets } = require('fabric-network');
const { BlockDecoder} = require('fabric-common')
// const { BlockDecoder } = require('BlockDecoder')
const path = require('path');
const fs = require('fs');
var Marshal = require('marshal');
async function main(dinhdanh){
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
        // Get the contract from the network.
        const contract = network.getContract('qscc');
        let blockID=0;
        let blockInfo
        let blockArray=[]
        while(true){
            try{
                 const result = await contract.evaluateTransaction('GetBlockByNumber', "mychannel",blockID)
                 blockInfo = BlockDecoder.decode(result)
                 blockArray.push(blockInfo)
                  blockID++
            }catch(e){
                break;

            }
        }
        console.log(blockArray)
        return blockArray

    } catch (error) {
       console.error(`Failed to evaluate transaction: ${error}`);
       return false;
    }
}
// let dinhdanh = 'appUser'
// main(dinhdanh)
module.exports = main
//async function temp(blockID, dinhdanh){
    
	// main('0', 'appUser')
 //  let blk_bytes = await main(blockID,dinhdanh)

    //let blk_bytes = await main(2,'appUser')
   /* let i=0;
    	while(true){
    		try{
    			let blk_bytes = await main(i,'appUser')
    			let blockInfo = BlockDecoder.decode(blk_bytes)
    			console.log(blockInfo)
    			i++;
    		}catch(e){
    			break;
    		}
    		
    	}*/
   //     let blockInfo = BlockDecoder.decode(blk_bytes)
   //     console.log(blockInfo)
    	
  //  }
 //   module.exports = temp;
