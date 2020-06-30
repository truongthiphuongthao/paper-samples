
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var enrollAdmin = require('./enrollAdmin.js')
var registerUser = require('./registerUser.js')
var khoiTaoCacHocPhan = require('./khoiTaoCacHocPhan')
var khoiTaoGiangVien = require('./khoiTaoGiangVien')
var themSinhVien = require('./themSinhVien.js')
var dangKyHocPhan = require('./dangKyHocPhan')
var choDiem = require('./choDiem.js')
var tinhTrungBinhHocKy = require('./tinhTrungBinhHocKy.js')
var tinhTichLuy = require('./tinhTichLuy.js')
var xetTotNghiep = require('./xetTotNghiep.js')
var truyVan = require('./truyVan.js')
var truyVanGV = require('./truyVanGV.js')
var truyVanBlock = require('./truyVanBlock.js')
var truyVanTatCaBlock = require('./truyVanTatCaBlock.js')
//Module cua tui
var moduleCreateSign = require('./genarate.js')
var moduleThemGV = require('./themGiangVien.js')
var suaDiem = require('./suaDiem.js')
var moduleThemSV = require('./themSinhVienTay.js')
const { KJUR, KEYUTIL } = require('jsrsasign');
const CryptoJS = require('crypto-js');


app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// Nha truong them sinh vien
app.use(express.static('../../frontend'))
// Nha truong tinh diem trung binh hoc ky cho sinh vien
app.get('/tinhTrungBinhHocKy', async(req, res)=>{
  let mssv = req.query.mssv
  let hocki = req.query.hocki
  console.log(req.query)
  let response = await tinhTrungBinhHocKy(mssv,hocki,'admin')
  res.send(response)
  console.log(response)
})
// Nha truong tinh diem tich luy cho sinh vien
app.get('/tinhTichLuy', async(req, res)=>{
  let mssv = req.query.mssv
  console.log(req.query)
  let response = await tinhTichLuy(mssv,'admin')
  res.send(response)
  console.log(response)
})
// //Nha truong xet tot nghiep cho sinh vien
app.get('/xetTotNghiep', async(req, res)=> {
  let mssv = req.query.mssv
  console.log(req.query)
  let response = await xetTotNghiep(mssv,'admin')
  res.send(response)
  console.log(response)
})
// Trang index truy van ket qua van bang cua sinh vien
app.get('/truyVan',async(req, res) =>{
    let mssv = req.query.mssv
    console.log(req.query.mssv)
    let response = await truyVan(mssv,'admin')
    console.log(response)
    res.send(response.toString())
})
//Nha truong truy van giang vien day mon nao
app.get('/truyVanGV', async(req, res)=>{
  let magv = req.query.magv
  console.log(req.query)
  let response = await truyVanGV(magv, 'admin')
  res.send(response)
  console.log(response)
})
// Lay blockID ra
app.get('/truyVanBlock', async(req, res)=>{
  let blockID = req.query.blockID;
  console.log(req.query.blockID)
  let response = await truyVanBlock(blockID,'admin')
  console.log("response"+JSON.stringify(response))
  res.send(JSON.stringify(response))
})
// Lay tat ca cac blockID ra
app.get('/truyVanTatCaBlock',async(req, res)=>{
  let response = await truyVanTatCaBlock('admin')
  console.log("response"+JSON.stringify(response))
  res.send(JSON.stringify(response))
})
//Dang ky gia vien trong blockchain
/*app.post('/themGiangVien', async(req,res) =>{
	let dinhdanh = req.body.dinhdanh
	let msgv  = req.body.maGiangVien
	let response = await moduleThemGV.registerUser(dinhdanh,msgv);
	res.send(response);
})*/
//Tao mot sinh vien moi
app.post('/themSinhVien',async(req,res)=>{   
  let ten = req.body.ten
  let mssv = req.body.mssv
  let cmnd = req.body.cmnd
  let response = await moduleThemSV.themSV(mssv,ten,cmnd,'appUser');
  res.send(response);
  console.log(response)
})
//Giao vien cho diem bang tay
app.post('/choDiemTay',async(req,res) =>{
	let mssv = req.body.mssv;
	let ki = req.body.hocky;
	let ma = req.body.maLopHocPhan;
	let diem = req.body.diemmoi;
	let dinhdanh = req.body.dinhdanh;
	let pk = req.body.pk;
	//let key = pk.split(' ').join('+');
	let data = mssv+ki+ma+diem+dinhdanh;
	let sigValueBase64 =moduleCreateSign(data, pk);
	console.log(sigValueBase64);
	let response = await moduleChangePoint.changePoint(mssv,ki,ma,diem,dinhdanh,sigValueBase64);
	res.send(response);
})

app.listen(port, async() => {
  await enrollAdmin()
  await registerUser('appUser')
  await moduleThemGV('TVChau','TVChau')
  await moduleThemGV('PHCuong','PHCuong')
  await moduleThemGV('TCDe','TCDe')
  await moduleThemGV('PTCang','PTCang')
  await moduleThemGV('NCHuy','NCHuy')
  await moduleThemGV('NCHNgoc','NCHNgoc')
  await moduleThemGV('LQThang','LQThang')
  await moduleThemGV('LDThang','LDThang')
  await moduleThemGV('TCAn','TCAn')
  await khoiTaoCacHocPhan()
  await khoiTaoGiangVien()
  await themSinhVien('admin')
  await dangKyHocPhan()
  await suaDiem('admin')
  //await choDiem('appUser')
  
  console.log(`Example app listening at http://localhost:${port}`)
});
