# install the chaincode on a third peer to use the same chaincode package of all peers
# peer1.org2.example.com
# Environment variables for PEER1 in Org2
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
CORE_PEER_ADDRESS=peer1.org2.example.com:10051
CORE_PEER_LOCALMSPID="Org2MSP"
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.example.com/peers/peer1.org2.example.com/tls/ca.crt
# install the same chaincode package
name=$1
peer lifecycle chaincode install $name.tar.gz
# join in channel
peer channel join -b mychannel.block

