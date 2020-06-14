/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

//exports.submitPaper= async function(mssv, name, year, type) {
 async function main (mssv,maLopHocPhan, diemmoi, dinhdanh) {
   // let response = {}
//  async function main() {
    try {
        // load the network configuration
       // const ccpPath = path.resolve(__dirname, '..', '..','test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccpPath = path.resolve(__dirname, '..', '..','first-network', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(dinhdanh);
        if (!identity) {
            console.log(`An identity for the user ${dinhdanh} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: dinhdanh, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');




        // Get the contract from the network.
        const contract = network.getContract('paper');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        // await contract.submitTransaction('submitPaper', mssv , name , year , type);
        //  await contract.submitTransaction('submitPaper', "B1609550" , "Thao" , "2020" , "Kha")
         await contract.submitTransaction('suaDiem',mssv, maLopHocPhan, diemmoi);
         console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();
        //response.msg ='submitPaper Transaction has been submitted'
	    return "Sua diem oke"+diemmoi

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        //response.error = error.message
       // return response
        //process.exit(1);
        return false;
        //return response;
    }
}
/*let mssv='B1609548';
let maLopHocPhan='CT173-01'
let diemmoi='8'
let dinhdanh='appUser';
main(mssv,maLopHocPhan, diemmoi, dinhdanh);*/
module.exports = main;
