/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
var moduleValid = require('./validate.js');
var taochuky = require('./genarate.js');
var laykhoa = require('./getPK.js');
//exports.changePoint= async function(mssv,ki,maLopHocPhan,diemmoi,dinhdanh, signature) {
async function main(dinhdanh) {
    try {
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

	//const data = mssv+ki+maLopHocPhan+diemmoi+dinhdanh
	//
	if(true){
		//var ob = new Object();
		//ob[maLopHocPhan]={diem:diemmoi, magv:dinhdanh, chuky:signature };
		//console.log(ob);
		//var dulieu = JSON.stringify(ob)
        await contract.submitTransaction('choDiem', 'B1609549' ,'hocki1', 
			JSON.stringify(
				{
				'CT001':{diem: 'A', magv: 'TVChau', signatrue: await taochuky('B1609549hocki1CT001ATVChau',await laykhoa('TVChau'))},
				'CT002':{diem: 'A', magv: 'PHCuong', signatrue: await taochuky('B1609549hocki1CT002APHCuong',await laykhoa('PHCuong'))},
				'CT003':{diem: 'A' ,magv: 'TCDe', signatrue: await taochuky('B1609549hocki1CT003ATCDe',await laykhoa('TCDe'))}
                		}
			)
		)
        await contract.submitTransaction('choDiem','B1609549', 'hocki2',
             JSON.stringify(
                {
                'CT004':{diem: 'B', magv: 'PTCang', signatrue: await taochuky('B1609549hocki2CT004BPTCang',await laykhoa('PTCang'))},
                'CT005':{diem: 'B+', magv: 'NCHuy', signatrue: await taochuky('B1609549hocki2CT005B+NCHuy',await laykhoa('NCHuy'))},
                'CT006':{diem: 'A' ,magv: 'NCHNgoc', signatrue: await taochuky('B1609549hocki2CT006ANCHNgoc',await laykhoa('NCHNgoc'))}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609549', 'hocki3',
             JSON.stringify(
                {
                'CT007':{diem: 'A', magv: 'LQThang', signatrue: await taochuky('B1609549hocki3CT007ALQThang',await laykhoa('LQThang'))},
                'CT008':{diem: 'B', magv: 'LDThang', signatrue: await taochuky('B1609549hocki3CT008BLDThang',await laykhoa('LDThang'))},
                'CT009':{diem: 'B' ,magv: 'TCAn', signatrue: await taochuky('B1609549hocki3CT009BTCAn',await laykhoa('TCAn'))}
                }
            )
        )
         // Sinh vien thu 2
         await contract.submitTransaction('choDiem','B1609550','hocki1',
            JSON.stringify(
                {
                'CT001':{diem: 'B', magv: 'TVChau', signatrue: await taochuky('B1609550hocki1CT001BTVChau',await laykhoa('TVChau'))},
                'CT002':{diem: 'A', magv: 'PHCuong', signatrue: await taochuky('B1609550hocki1CT002APHCuong',await laykhoa('PHCuong'))}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609550','hocki2',
            JSON.stringify(
                {
                'CT003':{diem: 'A' ,magv: 'TCDe', signatrue: await taochuky('B1609550hocki2CT003ATCDe',await laykhoa('TCDe'))},
                'CT004':{diem: 'C', magv: 'PTCang', signatrue: await taochuky('B1609550hocki2CT004CPTCang',await laykhoa('PTCang'))},
                'CT005':{diem: 'C+', magv: 'NCHuy', signatrue: await taochuky('B1609550hocki2CT005C+NCHuy',await laykhoa('NCHuy'))},
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609550','hocki3',
            JSON.stringify(
                {
                'CT006':{diem: 'B' ,magv: 'NCHNgoc', signatrue: await taochuky('B1609550hocki3CT006BNCHNgoc',await laykhoa('NCHNgoc'))},
                'CT007':{diem: 'B+', magv: 'LQThang', signatrue: await taochuky('B1609550hocki3CT007B+LQThang',await laykhoa('LQThang'))},
                'CT008':{diem: 'C', magv: 'LDThang', signatrue: await taochuky('B1609550hocki3CT008CLDThang',await laykhoa('LDThang'))},
                'CT009':{diem: 'A' ,magv: 'TCAn', signatrue: await taochuky('B1609550hocki3CT009ATCAn',await laykhoa('TCAn'))}
                }
            )
        )
        // Sinh vien thu 3
        await contract.submitTransaction('choDiem','B1609552','hocki1',
            JSON.stringify(
                {
                'CT001':{diem: 'B', magv: 'TVChau', signatrue: await taochuky('B1609552hocki1CT001BTVChau',await laykhoa('TVChau'))},
                'CT002':{diem: 'C', magv: 'PHCuong', signatrue: await taochuky('B1609552hocki1CT002CPHCuong',await laykhoa('PHCuong'))},
                'CT003':{diem: 'F' ,magv: 'TCDe', signatrue: await taochuky('B1609552hocki1CT003FTCDe',await laykhoa('TCDe'))}
                }
            )
        )
        await contract.submitTransaction('choDiem','B1609552','hocki3',
            JSON.stringify(
                {
                'CT004':{diem: 'C', magv: 'PTCang', signatrue: await taochuky('B1609552hocki3CT004CPTCang',await laykhoa('PTCang'))},
                'CT005':{diem: 'C+', magv: 'NCHuy', signatrue: await taochuky('B1609552hocki3CT005C+NCHuy',await laykhoa('NCHuy'))},
                'CT006':{diem: 'B' ,magv: 'NCHNgoc', signatrue: await taochuky('B1609552hocki3CT006BNCHNgoc',await laykhoa('NCHNgoc'))}
                }
            )
        )

		console.log('Transaction has been submitted');

		// Disconnect from the gateway.
		await gateway.disconnect();
		var response ='Nhap diem thanh cong! ';
		return response;
	}else{
		await gateway.disconnect();
		response ='Ban da nhap sai khoa rieng! ';
		return response;
	}

    } catch (error) {
        console.log(`Failed to submit transaction: ${error}`);
        //response.error = error.message
       // return response
        process.exit(1);
        //return error;
    }
}
let mssv='B1609577';
let maLopHocPhan='CT001'
let diemmoi='A'
let dinhdanh='TCDe';
let signature ='MEYCIQDgL3K5sY7eiOoDn5nHVf0XyreJrNxVrnTDW1NcxCQsOwIhAN0sg9D6z+Gt99LVINh7wVIuTAk1ROlpWh5W96JgsGEr'
module.exports = main
//main('admin')
