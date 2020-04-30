. ./scripts/utils.sh
## at first we package the chaincode
packageChaincode 1 0 1

## Install chaincode on peer0.org1 and peer0.org2
echo "Installing chaincode on peer0.org1..."
installChaincode 0 1
echo "Install chaincode on peer0.org2..."
installChaincode 0 2

## query whether the chaincode is installed
queryInstalled 0 1

## approve the definition for org1
approveForMyOrg 1 0 1

## check whether the chaincode definition is ready to be committed
## expect org1 to have approved and org2 not to
checkCommitReadiness 1 0 1 "\"Org1MSP\": true" "\"Org2MSP\": false"
checkCommitReadiness 1 0 2 "\"Org1MSP\": true" "\"Org2MSP\": false"

## now approve also for org2
approveForMyOrg 1 0 2

## check whether the chaincode definition is ready to be committed
## expect them both to have approved
checkCommitReadiness 1 0 1 "\"Org1MSP\": true" "\"Org2MSP\": true"
checkCommitReadiness 1 0 2 "\"Org1MSP\": true" "\"Org2MSP\": true"

## now that we know for sure both orgs have approved, commit the definition
commitChaincodeDefinition 1 0 1 0 2

## query on both orgs to see that the definition committed successfully
queryCommitted 1 0 1
queryCommitted 1 0 2

# invoke init
chaincodeInvoke 1 0 1 0 2

# Query chaincode on peer0.org1
#echo "Querying chaincode on peer0.org1..."
#chaincodeQuery 0 1 100

# Invoke chaincode on peer0.org1 and peer0.org2
#echo "Sending invoke transaction on peer0.org1 peer0.org2..."
#chaincodeInvoke 0 0 1 0 2

# Query chaincode on peer0.org1
#echo "Querying chaincode on peer0.org1..."
#chaincodeQuery 0 1 90

## Install chaincode on peer1.org2
#echo "Installing chaincode on peer1.org2..."
#installChaincode 1 2

# Query on chaincode on peer1.org2, check if the result is 90
#echo "Querying chaincode on peer1.org2..."
#chaincodeQuery 1 2 90

