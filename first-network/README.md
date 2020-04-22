#USE FIRST NETWORK BY SCRIPT
./runConfig.sh
./startDocker.sh
In cli: 
./joinorg/joinorg1.sh
./joinorg/joinorg2.sh
Deploy chaincode in cli
./script /pathtodirchaincode/ language namepackage version
If you add peer for channel and deploy the same package chaincode 
./scripts/addPeerDeploy.sh


