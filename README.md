#Cau hinh nameserver trong thu muc /etc/resolv.conf them 8.8.8.8
sudo gedit /etc/resolv.conf 

nameserver 8.8.8.8

# Khoi dong network len trong thu muc /first-network
sudo ./byfn.sh up -n -a

# khoi dong docker
./startChannel.sh

# Deploy chaincode trong cli
./scripts/deployChaincode.sh paper 1

# Chay client trong thu muc fabcar/javascript bang cach chay cac node dua theo viec anh xa cac ham trong chaincode
node enrolAdmin.js

node registerUser.js

# Them doi tuong sinh vien 
node themSinhVien.js 

# Them doi tuong giang vien 
node themGiangVien.js

# Truy van doi tuong sinh vien
node truyVan.js

# Tra ve da tot nghiep hay chua
node truyVanTotNghiep.js

# Giang vien sua diem, nhap diem cho sinh vien
node suaDiem.js


# Thu muc front end chua giao dien cac trang web
# server.js chua trong thu muc fabcar/javascript
# approve.js laf file de xem xet sinh vien duoc tot nghiep hay chua
# khi muon down network thi phai xoa id trong wallet 
cd fabcar/ 

sudo ./networkDown.sh

cd first-network/

sudo ./byfn.sh down


