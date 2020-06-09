'use strict';
const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
//const assert = require('assert')

class QuanLyDiem extends Contract {
	
	//async getIdentity(ctx) { 
		/*let identity = null
		return identity*/
		//let cid = new ClientIdentity(ctx)
		// if !cid.firstName:
		// 	throw 

		// if(cid.assertAttributeValue('firstName','Thao')){
		// 	throw new Error('Not a valid user')
		// }
		//identity = cid.firstName
		//return identity
	//}

	async khoiTao(ctx){
		const obj_sv = 
		{
			"B1609548":{
				"ten": "Truong Thi Phuong Thao",
				"cmnd": "092198000255",
				"hocphan":{
				    "CT173-01":{
				    	"diem": 7,
				    	"tinchi":3,
				    	"choboi": "GV-001-TMThai"
				    },
				    "CT174-01":{
				    	"diem": 4,
				    	"tinchi":3,
				    	"choboi": "GV-002-VTThuc"
				    },
				    "ML002-02":{
				    	"diem": 10,
				    	"tinchi":3,
                        "choboi": "GV-003-PVBua"
				    },
				    "KL001-01":{
				    	"diem": 8,
				    	"tinchi":3,
				    	"choboi": "GV-003-DTNguyen"
				    }
				 }
			},
		    "AllowedUser":[
				{"tengv": "GV-002-PTCang"},
				{"tengv": "GV-003-NTNghe"}
			]		
		}
		await ctx.stub.putState("B1609548",Buffer.from(JSON.stringify(obj_sv["B1609548"])))
		await ctx.stub.putState("AllowedUser",Buffer.from(JSON.stringify(obj_sv["AllowedUser"])))
		console.info(obj_sv["B1609548"])
		console.info(obj_sv["AllowedUser"])
	}

	async themGiangVien(ctx, maGiangVien){ // them vao giangVien co ma la maGiangVien, tin giang vien nay
		const gv = await ctx.stub.getState("AllowedUser")
		const gvinfo = JSON.parse(gv.toString())
		gvinfo.push({"tengv":maGiangVien})
		const result = await ctx.stub.putState("AllowedUser",Buffer.from(JSON.stringify(gvinfo)))
		console.log(gvinfo)
	}
	async themSinhVien(ctx, mssv, ten, cmnd){
		// TODO: add middleware
		const sinhvien = {
			'ten': ten,
			'cmnd': cmnd,
			'hocphan': {}
		}

	    const result = await ctx.stub.putState(mssv, Buffer.from(JSON.stringify(sinhvien)));
	    console.log("them sinh vien thanh cong")
	}
	async suaDiem(ctx, mssv, maLopHocPhan,diemmoi){ // giang vien se them diem/hoac sua diem hoc maLopHocPhan cua sinh vien co mssv voi diem tuong ung 
		// kiem tra giangvien co the sua diem cua "maLopHocPhan" khong
		// tien hanh sua diem cua sinh vien, va luu ten nguoi sua lai
		//const identity = await getIdentity(ctx)
		const sv = await ctx.stub.getState(mssv);
		const svinfo = JSON.parse(sv.toString());
		// lay ma hoc phan
		const maNhom = svinfo.hocphan[maLopHocPhan]
		// sua diem cu thanh diem moi
		svinfo.hocphan[maLopHocPhan].diem = diemmoi;
		//svinfo.hocphan[maLopHocPhan].choboi = identity; 
		const result = await ctx.stub.putState(mssv, Buffer.from(JSON.stringify(svinfo)))
		console.log(svinfo)
	}


    async truyVan(ctx, mssv){ // truy van cac diem cua sinh vien
		const sv = await ctx.stub.getState(mssv)
		//const svinfo = JSON.parse(sv)
		//console.info(svinfo)
		console.log(sv.toString())
		return sv.toString()
		//console.info(svinfo.hocphan['CT173-01']['diem'])
	}
	
	async truyVanTotNghiep(ctx, mssv){// xet xem sinh vien co tot nghiep khong 
       const sv = await ctx.stub.getState(mssv)
       
       const svinfo = JSON.parse(sv.toString())
       let tong = 0
       let tongSoChi = 0
       // console.log(svinfo.hocphan)

       for(let lophoc in svinfo.hocphan){
       		// console.log(svinfo.hocphan[lophoc])
       	// tinh tong deim 
       		
       		tong += svinfo.hocphan[lophoc].diem * svinfo.hocphan[lophoc].tinchi
       		tongSoChi += svinfo.hocphan[lophoc].tinchi
       }    
       const diemtb = tong/tongSoChi
       console.log('Diem trung binh: ', tong/tongSoChi)
       if(diemtb>=4.0  && tongSoChi>=12){
       	  return "Da Tot nghiep"
       }
       return "Chua Tot nghiep"
	}
}
	
/*const { ChaincodeMockStub, Transform } = require("@theledger/fabric-mock-stub")
let chaincode = new QuanLyDiem()
const mockStub = new ChaincodeMockStub("MyMockStub", chaincode)
describe ('Test Mychaincode', () => {
	it("Should init without issues", async () => {
	 
	   mockStub.mockTransactionStart()
	   const initResult = await chaincode.khoiTao({stub:mockStub},[])
	   
	   //const submitResult = await chaincode.submitPaper({stub:mockStub},['B1609550'],'Lisa','2021','gioi')
	   //const replyResult = await chaincode.replyPaper({stub:mockStub},['B1609548'])
	});
	 it('should query initialized records', async()=>{
    	const ketQuaDiem = await chaincode.truyVan({stub:mockStub},'B1609548')
       // console.log(ketQuaDiem)
        //assert.equal(paperResult != "", true)
    })
	 
	 it('should truyvan initialized records', async()=>{
    	const suaDiem = await chaincode.suaDiem({stub:mockStub},'B1609548','CT173-01',8)
       // console.log(suaDiem)
        //assert.equal(paperResult != "", true)
    })
	 it('should themGiangVien initialized records', async()=>{
    	const themGiangVien = await chaincode.themGiangVien({stub:mockStub},'GV-004-PNKhang')
       // console.log(suaDiem)
        //assert.equal(paperResult != "", true)
    })
	 it('should truyVanTotNghiep initialized records', async()=>{
    	const truyVanTotNghiep = await chaincode.truyVanTotNghiep({stub:mockStub},'B1609548')
       // console.log(suaDiem)
        //assert.equal(paperResult != "", true)
    })
	 it('should getIdentity initialized records', async()=>{
    	const getIdentity = await chaincode.getIdentity({stub:mockStub})
       // console.log(suaDiem)
        //assert.equal(paperResult != "", true)
    })	
})*/
module.exports = QuanLyDiem;
