
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
var themGiangVien = require('./themGiangVien.js')
var truyVanGV = require('./truyVanGV.js')
//var truyVan = require('./truyVan.js')
//var truyVanTotNghiep = require('./truyVanTotNghiep.js')

var truyVanBlock = require('./truyVanBlock.js')
var truyVanTatCaBlock = require('./truyVanTatCaBlock.js')


//var dangKyHocPhan = require('./dangKyHocPhan')

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
// Nha truong them sinh vien
app.use(express.static('../../frontend'))
app.post('/themSinhVien', async(req, res) => {
   let ten = req.body.ten
   let mssv = req.body.mssv
   let cmnd = req.body.cmnd
   console.log(req.body)
   let response = await themSinhVien(mssv, ten, cmnd, 'appUser');
   res.send(response)
   await dangKyHocPhan()
   console.log(response)
})
// Giang vien cho diem sinh vien
app.post('/choDiem',async(req, res) => {
  let mssv = req.body.mssv
  let ki = req.body.ki
  let maLopHocPhan = req.body.maLopHocPhan
  let diemmoi = req.body.diemmoi
  console.log(req.body)
  let response = await choDiem(mssv, ki, maLopHocPhan, diemmoi,'appUser')
  res.send(response)
   console.log(response)
})
// Nha truong tinh diem trung binh hoc ky cho sinh vien
app.get('/tinhTrungBinhHocKy', async(req, res)=>{
  let mssv = req.query.mssv
  let hocki = req.query.hocki
  console.log(req.query)
  let response = await tinhTrungBinhHocKy(mssv,hocki,'appUser')
  res.send(response)
  console.log(response)
})
// Nha truong tinh diem tich luy cho sinh vien
app.get('/tinhTichLuy', async(req, res)=>{
  let mssv = req.query.mssv
  console.log(req.query)
  let response = await tinhTichLuy(mssv,'appUser')
  res.send(response)
  console.log(response)
})
// Nha truong xet tot nghiep cho sinh vien
app.get('/xetTotNghiep', async(req, res)=> {
  let mssv = req.query.mssv
  console.log(req.query)
  let response = await xetTotNghiep(mssv,'appUser')
  res.send(JSON.parse(response).kq)
  console.log(response)
})
// Nha truong them giang vien
app.post('/themGiangVien', async(req, res)=>{
  let mahp = req.body.mahp
  let magv = req.body.magv
  let response = await themGiangVien(mahp, magv,'appUser')
  res.send(response)
  console.log(response)
})
// Nha truong truy van giang vien day mon nao
app.get('/truyVanGV', async(req, res)=>{
  let magv = req.query.magv
  console.log(req.query)
  let response = await truyVanGV(magv, 'appUser')
  res.send(response)
  console.log(response)
})
// Lay blockID ra
app.get('/truyVanBlock', async(req, res)=>{
  let blockID = req.query.blockID;
  console.log(req.query.blockID)
  let response = await truyVanBlock(blockID,'appUser')
  console.log("response"+JSON.stringify(response))
  res.send(JSON.stringify(response))
})
// Lay tat ca cac blockID ra
app.get('/truyVanTatCaBlock',async(req, res)=>{
  let response = await truyVanTatCaBlock('appUser')
  console.log("response"+JSON.stringify(response))
  res.send(JSON.stringify(response))
})
// Trang index truy van ket qua van bang cua sinh vien
app.get('/truyVan',async(req, res) =>{
    let mssv = req.query.mssv
     console.log(req.query.mssv)
    let response = await truyVan(mssv,'appUser')
    console.log(response)
    res.send(response.toString())
})

// them giang vien
// app.post('/themGiangVien',async(req, res)=> {
//   let tengv = req.body.tengv;
//   let maGiangVien = req.body.maGiangVien;
//     console.log(req.body);
//   let response = await themGiangVien(maGiangVien,'appUser');
//   res.send(response)
//    console.log(response)
// })


// truy van tot nghiep
// app.get('/truyVanTotNghiep', async(req, res) =>{
//     let mssv = req.query.mssv;
//     // console.log(req.)
//     console.log(req.query.mssv);
//     let response = await truyVanTotNghiep(mssv, 'appUser');
//     res.send(response.toString());
// })
// truyVan 


// // truy van tat ca cac block

/*app.post('/', (req, res)=> {   
        res.writeHead(200,{"Content-Type" : "text/plain"});
        res.write("MSSV:"+req.body.mssv)
        res.write("Ho va ten:"+req.body.name)
        res.write("Nam tot nghiep:"+req.body.year)
        res.write("Loai tot nghiep:"+req.body.type)
        ret = s.end()
})*/
/*app.get('/queryPaper', async(req,res) => {
     console.log(req.query.mssv)
     let response = await moduleQuery.queryPaper(req.query.mssv)
     //let papersRecord = JSON.parse(response)
     res.send(response)
})
app.post('/',(req, res)=> {
    console.log(req.body)
    moduleInvoke.submitPaper(req.body.mssv, req.body.name, req.body.year, req.body.type)
    .then((response) => {
      res.send(response)
      console.log(response)
    })
})

app.post('/approvePaper', async(req,res) => {
     console.log(req.query.mssv)
     approve = req.body.submit // TODO: Edit here for approval permission
     console.log('approval state:', approve)
     let response = await moduleApprove.approvePaper(req.body.mssv, approve)
     //let papersRecord = JSON.parse(response)
     res.send(response)
})*/

app.listen(port, async() => {
  await registerUser('appUser')
  await khoiTaoCacHocPhan()
  await khoiTaoGiangVien()
  console.log(`Example app listening at http://localhost:${port}`)
});