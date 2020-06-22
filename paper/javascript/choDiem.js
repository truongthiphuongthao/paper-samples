/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
 async function main (dinhdanh) {
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
        await gateway.connect(ccp, { wallet, identity: dinhdanh, discovery: { enabled: true, asLocalhost: true } })

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')
        // Get the contract from the network.
        const contract = network.getContract('paper')
        await contract.submitTransaction('choDiem','B1609549','hocki1',
            JSON.stringify(
                {
                'CT001':{diem: 'A', magv: 'TVChau'},
                'CT002':{diem: 'A', magv: 'PHCuong'},
                'CT003':{diem: 'A' ,magv: 'TCDe'}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609549', 'hocki2',
             JSON.stringify(
                {
                'CT004':{diem: 'B', magv: 'PTCang'},
                'CT005':{diem: 'B+', magv: 'NCHuy'},
                'CT006':{diem: 'A' ,magv: 'NCHNgoc'}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609549', 'hocki3',
             JSON.stringify(
                {
                'CT007':{diem: 'A', magv: 'LQThang'},
                'CT008':{diem: 'B', magv: 'LDThang'},
                'CT009':{diem: 'B' ,magv: 'TCAn'}
                }
            )
        )
         // Sinh vien thu 2
         await contract.submitTransaction('choDiem','B1609550','hocki1',
            JSON.stringify(
                {
                'CT001':{diem: 'B', magv: 'TVChau'},
                'CT002':{diem: 'A', magv: 'PHCuong'}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609550','hocki2',
            JSON.stringify(
                {
                'CT003':{diem: 'A' ,magv: 'TCDe'},
                'CT004':{diem: 'C', magv: 'PTCang'},
                'CT005':{diem: 'C+', magv: 'NCHuy'},
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609550','hocki3',
            JSON.stringify(
                {
                'CT006':{diem: 'B' ,magv: 'NCHNgoc'},
                'CT007':{diem: 'B+', magv: 'LQThang'},
                'CT008':{diem: 'C', magv: 'LDThang'},
                'CT009':{diem: 'A' ,magv: 'TCAn'}
                }
            )
        )
        // Sinh vien thu 3
        await contract.submitTransaction('choDiem','B1609552','hocki1',
            JSON.stringify(
                {
                'CT001':{diem: 'B', magv: 'TVChau'},
                'CT002':{diem: 'C', magv: 'PHCuong'},
                'CT003':{diem: 'F' ,magv: 'TCDe'}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609552','hocki3',
            JSON.stringify(
                {
                'CT004':{diem: 'C', magv: 'PTCang'},
                'CT005':{diem: 'C+', magv: 'NCHuy'},
                'CT006':{diem: 'B' ,magv: 'NCHNgoc'}
                }
            )
        )
        console.log('Transaction has been submitted choDiem');
        // Disconnect from the gateway.
        await gateway.disconnect()
        //return "cho diem oke "+diemmoi

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`)
        return false;
    }
}
// let dinhdanh='appUser'
// main(dinhdanh);
module.exports = main;