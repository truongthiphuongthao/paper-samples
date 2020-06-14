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
             "tengv" : "Khoai Lang",
             "magv" : "GV001"
          },
          "QP004" : {
            "tengv" : "Khoai Lang",
            "magv" : "GV001"
          },
          "QP005" : {
            "tengv" : "Khoai Mon",
            "magv" : "GV003"
          },
          "TN001" : {
            "tengv" : "Khoai So",
            "magv" : "GV004"
          }
        }))
    )
     // them giang vien
  await chaincode.themGiangVien({stub:mockStub},'TN006','Khoai','GV005')
   // await chaincode.truyVanGV({stub:mockStub},'GV005')
   await chaincode.themSinhVien({stub: mockStub}, 'B1609549', 'Phuong Thao', '362')
	});
  // Dang ky hoc phan
  it('should dangKiHocPhan initialized records', async()=>{
     await chaincode.dangKyHocPhan({stub:mockStub},'B1609549','hocki1nam1',{'QP003':{diem: -1, choboi: null},'QP004':{diem: -1, choboi: null}})
     await chaincode.dangKyHocPhan({stub:mockStub},'B1609549','hocki2nam1',{'QP005':{diem: -1},'TN001':{diem: -1}})
  })
  // Truy van sinh vien
	 it('should truyVan initialized records', async()=>{
    	const truyVan = await chaincode.truyVan({stub:mockStub},'B1609549')
       // console.log(ketQuaDiem)
        //assert.equal(paperResult != "", true)
    })
	 // Cho diem
   it('should choDiem initialized records', async()=>{
       await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki1nam1', 'QP003', 'A')
       await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki1nam1', 'QP004', 'A')
       await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki2nam1', 'QP005', 'B+')
       await chaincode.choDiem({stub:mockStub},'B1609549', 'hocki2nam1', 'TN001', 'A')
       // console.log(ketQuaDiem)
        //assert.equal(paperResult != "", true)
    })
	
	  it('should tinhtichLuy initialized records', async()=>{
     	 await chaincode.tinhTichLuy({stub:mockStub},'B1609549','hocki1nam1')
       await chaincode.tinhTichLuy({stub:mockStub},'B1609549','hocki2nam1')
     })
    // xet tot nghiep
    it('should xetTotNghiep initialized records', async()=>{
      
      const xetTotNghiep = await chaincode.xetTotNghiep({stub:mockStub},'B1609549')
     })
	 // it('should getIdentity initialized records', async()=>{
  //   	const getIdentity = await chaincode.getIdentity({stub:mockStub})
  //      // console.log(suaDiem)
  //       //assert.equal(paperResult != "", true)
  //   })	
  // Dang ki hoc phan
  
})
module.exports = QuanLyDiem;
