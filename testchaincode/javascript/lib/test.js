'use strict';
const { Contract } = require('fabric-contract-api');
const assert = require('assert')
const ClientIdentity = require('fabric-shim').ClientIdentity;
const QuanLyDiem  = require('../../../chaincode/javascript/lib/paper')
const { ChaincodeMockStub, Transform } = require("@theledger/fabric-mock-stub")
let chaincode = new QuanLyDiem()
const mockStub = new ChaincodeMockStub("MyMockStub", chaincode)
describe ('Test Mychaincode', () => {
	it("Should init without issues", async () => {
	   mockStub.mockTransactionStart()
//	   const initResult = await chaincode.khoiTao({stub:mockStub},[])
	   await chaincode.khoiTaoCacHocPhan({stub: mockStub}, 
        Buffer.from(JSON.stringify({
       "QP003" : {
                "ten" : "Giáo dục quốc phòng - An ninh 1",
                "sotinchi" : 3
       },
       "QP004" : {
                "ten" : "Giáo dục quốc phòng - An ninh 2",
                "sotinchi" :  2
       },
       "QP005" : {
                "ten" : "Giáo dục quốc phòng - An ninh 3",
                "sotinchi" : 3
       },
       "TN001" : {
                "ten" : "Vi - Tích phân A1",
                "sotinchi" : 3
       },
       "TN006" : {
                "ten" : "Vi - Tích phân A2",
                "sotinchi" : 3
       }
     }))
    )
     //khoi tao giang vien
     await chaincode.khoiTaoGiangVien({stub: mockStub}, 
        Buffer.from(JSON.stringify({
          "QP003" : {
             "magv" : "GV001"
          },
          "QP004" : {
            "magv" : "GV002"
          },
          "QP005" : {
            "magv" : "GV003"
          },
          "TN001" : {
            "magv" : "GV004"
          }
        }))
    )
    await chaincode.themSinhVien({stub: mockStub}, 'B1609549', 'Phuong Thao', '362')
	});
 // Dang ky hoc phan
  it('should dangKiHocPhan initialized records', async()=>{
    console.log("Dang ky hoc phan")
    await chaincode.dangKyHocPhan({stub:mockStub},'B1609549','hocki1nam1',
        JSON.stringify({'QP003':{diem: -1, magv: null},'QP004':{diem: -1, magv: null}}))

    await chaincode.dangKyHocPhan({stub:mockStub},'B1609549','hocki2nam1',
        JSON.stringify({'QP005':{diem: -1, magv: null},'TN001':{diem: -1, magv: null}}))
  })  
  it('should truyVanGiangVien initialized records', async()=>{
      console.log("Truy van giang vien")
      const truyVanGV = await chaincode.truyVanGV({stub:mockStub},'GV001')
      console.log(truyVanGV)
  })      

  // Truy van sinh vien
	it('should truyVan initialized records', async()=>{
      console.log("Truy van sinh vien")
      const truyVan = await chaincode.truyVan({stub:mockStub},'B1609549')
      console.log(
        JSON.stringify(JSON.parse(truyVan), null, 4)
      )
      assert.equal(JSON.stringify(JSON.parse(truyVan).hocki.hocki1nam1), JSON.stringify({'QP003':{diem: -1, magv: null},'QP004':{diem: -1, magv: null}}))
  })  

  it('should give access to maGv for subject class idenitfied by mahp', async()=>{
    console.log("them giang vien")
    await chaincode.themGiangVien({stub:mockStub}, 'QP006','GV005')
  }) 
	// Cho diem
  it('should choDiem initialized records', async()=>{ 
    await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki1nam1', 'QP003', 'A')
    await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki1nam1', 'QP004', 'A')
    await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki2nam1', 'QP005', 'B+')
    await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki2nam1', 'TN001', 'A')
  })
  it('should truyVan initialized records', async()=>{
    console.log("Truy van sinh vien")
    const truyVan = await chaincode.truyVan({stub:mockStub},'B1609549')
    console.log(
      JSON.stringify(JSON.parse(truyVan), null, 4)
    )
    // console.log()
    assert.equal(JSON.stringify(JSON.parse(truyVan).hocki.hocki1nam1), JSON.stringify({'QP003':{diem: 'A', magv: 'GV001'},'QP004':{diem: 'A', magv: 'GV002'}}))
    // assert.equal(truyVan/ != "", true)
  })  


  it('should tinhtichLuy initialized records', async()=>{
  	 await chaincode.tinhTichLuy({stub:mockStub},'B1609549')
  })

  it('should tinhDiemTBHocKy initialized records', async()=>{
    await chaincode.tinhTrungBinhHocKy({stub:mockStub},'B1609549','hocki1nam1')
    await chaincode.tinhTrungBinhHocKy({stub:mockStub},'B1609549','hocki2nam1')
  })
  
  //  // xet tot nghiep
  it('should xetTotNghiep initialized records', async()=>{

    const xetTotNghiep = await chaincode.xetTotNghiep({stub:mockStub},'B1609549')
    console.log(xetTotNghiep)
  })
})
module.exports = QuanLyDiem;
