'use strict';
const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
class QuanLyDiem extends Contract {
	
	async getIdentity(ctx) { 
		let cid = new ClientIdentity(ctx.stub)
		let id = cid.getAttributeValue('name')
		return id
	}

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
	// Khoi tao hoc phan
	async khoiTaoCacHocPhan(ctx, hocphan) {
		// TODO: Privilege
		ctx.stub.putState("__hocphan__", hocphan)
	}

	// khoi tao giang vien
	async khoiTaoGiangVien(ctx, giangvien){
		ctx.stub.putState("__giangvien__", giangvien)		
	}

	// them giang vien vao LOP hoc phan 
	// async themGiangVien(ctx, mahp, magv){ 
	// 	 // let tatCaGiangVien = JSON.parse(await ctx.stub.getState('__giangvien__'))
	// 	 // let gvinfo = JSON.parse(tatCaGiangVien)
	// 	let tatCaGiangVien = await ctx.stub.getState('__giangvien__') 
	// 	const gvinfo = JSON.parse(tatCaGiangVien)
	// 	console.log("Giang vien",gvinfo)
	// 	gvinfo[mahp] = magv
	//     const result = await ctx.stub.putState(magv, Buffer.from(JSON.stringify(gvinfo)));
	//     console.log("them giang vien thanh cong cho hoc phan " + mahp)
	// }


	//truy van giang vien
	// async truyVanGV(ctx, magv){ // truy van cac hoc phan ma giang vien day:
	// 	const gv = JSON.parse(await ctx.stub.getState('__giangvien__'))
	// 	let cacHocPhan = []   
	// 	for(let key in gv) { // TODO: fix this bad practice
	// 		if (gv[key] == magv) cacHocPhan.push(key)
	// 	}
	// 	return JSON.stringify(cacHocPhan)
	// }

	async themSinhVien(ctx, mssv, ten, cmnd) {
		// console.log(ctx.stub.getState('__hocphan__'))
		let tatCaHocPhan = await ctx.stub.getState('__hocphan__')
		// let tatCaSinhVien = JSON.parse(await ctx.stub.getState('__sinhvien__')) // e ko can lam cai nay
		// TODO: add middleware

		const sinhvien = {
			'ten': ten,
			'cmnd': cmnd,
			'hocki' : {
				'hocki1nam1' : {
					
				},
				'hocki2nam1' : {

				},
				'hocki3nam1' : {

				},
				'hocki1nam2' : {

				},
				'hocki2nam2' : {

				},
				'hocki3nam2' : {

				},
				'hocki1nam3' : {

				},
				'hocki2nam3' : {

				},
				'hocki3nam3' : {

				},
				'hocki4nam1' : {

				},
				'hocki4nam2' : {

				},
				'hocki4nam3' : {

				},
				'hocki5nam1' : {

				}
			} 
				
		}
		await ctx.stub.putState(mssv, Buffer.from(JSON.stringify(sinhvien)));
		console.log("them sinh vien thanh cong")
	}



	// Giang vien cho diem
	async choDiem(ctx, mssv, ki, maLopHocPhan, diemmoi){
		//const identity = await this.getIdentity(ctx)
		const identity = 'test'
	    const sv = await ctx.stub.getState(mssv);
	    const svinfo = JSON.parse(sv); 
	    const gv = await ctx.stub.getState('__giangvien__')
	    const gvinfo = JSON.parse(gv)
	    
    	// if (gv[maLopHocPhan] == undefined) {// TODO: Add condition as CID reveals who he/she is
    	// 	throw "Giao vien khong the sua diem hoc phan nay"}
        // console.log(GV[maLopHocPhan].magv,null,4)
	    for(let hocki in svinfo.hocki){
	    	if (svinfo.hocki[ki][maLopHocPhan] != undefined) {
	    		svinfo.hocki[ki][maLopHocPhan] = {
	    			'diem' : diemmoi,
	    			'magv' : gv[maLopHocPhan]	    			
	    		}
	    	}
	    }
	    const result = await ctx.stub.putState(mssv, Buffer.from(JSON.stringify(svinfo)))
	    console.log("Ket qua cho diem:",JSON.stringify(svinfo, null, 4))
	}

    async truyVan(ctx, mssv){ // truy van cac diem cua sinh vien
		const sv = await ctx.stub.getState(mssv)
		console.log("Sinh vien:"+sv)
		return sv.toString()
	}
	
	async dangKyHocPhan(ctx, mssv, hocki, hocphan) {
		const sv = await ctx.stub.getState(mssv);
		const svinfo = JSON.parse(sv);
		console.log(svinfo.hocki[hocki])
		// todo: Kiem tra hocphan xem hop le k
		if (svinfo.hocki[hocki] != undefined){
			svinfo.hocki[hocki] = hocphan
			await ctx.stub.putState(mssv, Buffer.from(JSON.stringify(svinfo)));
		} 
		else throw 'khong the dang ky duoc nua'
	}


	async tinhTrungBinhHocKy(ctx, mssv, hocki){// tinh diem trung binh hoc ki
		// lay ra sinh vien
		const sv = await ctx.stub.getState(mssv) 
		const svinfo = JSON.parse(sv) 
		// lay ra hoc phan
		const hp = await ctx.stub.getState('__hocphan__')
		const hpinfo = JSON.parse(hp)
		let sinhvien = svinfo
		let tthp = hpinfo
		let tong = 0;
		let tongSoChiTB = 0;
		let diemHocKy = sinhvien.hocki[hocki]
		for(let hocphan in diemHocKy){
			const bangDiem = {
				'A': 4, 
				'B+': 3.5,
				'B': 3.0,
				'C+': 2.5 ,
				'C': 2.0,
				'D+': 1.5,
				'D': 1.0,
				'F': 0.0
			}		
			let diem = diemHocKy[hocphan].diem
			if(diem != 'F'){
				tong += bangDiem[diem] * tthp[hocphan].sotinchi
				tongSoChiTB += tthp[hocphan].sotinchi
			}
		}
		let diemTB = tong/tongSoChiTB
		return JSON.stringify({
		   'diem' : diemTB.toFixed(2),
	       'sochi' : tongSoChiTB
		})
	}
	async tinhTichLuy(ctx, mssv){// tinh diem tich luy hien tai
		// lay ra sinh vien
		const sv = await ctx.stub.getState(mssv) 
		const svinfo = JSON.parse(sv) 
		// lay ra hoc phan
		const hp = await ctx.stub.getState('__hocphan__')
		const hpinfo = JSON.parse(hp)
		let sinhvien = svinfo
		let tthp = hpinfo
		let tong = 0;
		let tongSoChiTL = 0;
		for(let hocki in sinhvien.hocki){
			let diemHocKy = sinhvien.hocki[hocki]
			for(let hocphan in diemHocKy){
				const bangDiem = {
					'A': 4, 
					'B+': 3.5,
					'B': 3.0,
					'C+': 2.5 ,
					'C': 2.0,
					'D+': 1.5,
					'D': 1.0,
					'F': 0.0
				}		
				let diem = diemHocKy[hocphan].diem
				if(diem != 'F'){
					tong += bangDiem[diem] * tthp[hocphan].sotinchi
					tongSoChiTL += tthp[hocphan].sotinchi
				}
			}
		}
		let diemTBTL = tong/tongSoChiTL
		return JSON.stringify(
			{
			   'diem' : diemTBTL.toFixed(2),
		       'sochi' : tongSoChiTL
			}
		)
	}

	async xetTotNghiep(ctx, mssv){ // xet xem sinh vien co tot nghiep khong 
		const sv = await ctx.stub.getState(mssv) 
		const svinfo = JSON.parse(sv)
		let sinhvien = svinfo 
		let tong = 0;
		let tichLuy = JSON.parse(await this.tinhTichLuy(ctx, mssv))
		let tongSoChi = tichLuy.sochi
		let diemTotNghiep = tichLuy.diem
		let kq = tongSoChi>=145 ? "Da tot nghiep" : "Chua tot nghiep"
		let ketqua = { 
				'diemTotNghiep' : diemTotNghiep,
		        'tongSoChi' : tongSoChi,
		       	'kq' : kq 
			} 
		//console.log(ketqua)

		 return JSON.stringify(ketqua)
	}
}	    
module.exports = QuanLyDiem;
