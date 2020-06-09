
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var port = 3000
var enrollAdmin = require('./enrollAdmin.js')
var registerUser = require('./registerUser.js')
var themGiangVien = require('./themGiangVien.js')
var themSinhVien = require('./themSinhVien.js')
var truyVan = require('./truyVan.js')
var truyVanTotNghiep = require('./truyVanTotNghiep.js')
var suaDiem = require('./suaDiem.js')
var truyVanBlock = require('./truyVanBlock.js')

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.static('../../frontend'))
// Them sinh vien
app.post('/themSinhVien', async(req, res) => {
   let ten = req.body.ten
   let mssv = req.body.mssv
   let cmnd = req.body.cmnd
      console.log(req.body);
   let response = await themSinhVien(mssv, ten, cmnd, 'appUser');
   res.send(response)
   console.log(response)
})
// them giang vien
app.post('/themGiangVien',async(req, res)=> {
  let tengv = req.body.tengv;
  let maGiangVien = req.body.maGiangVien;
    console.log(req.body);
  let response = await themGiangVien(maGiangVien,'appUser');
  res.send(response)
   console.log(response)
})
// suaDiem
app.post('/themDiem',async(req, res) => {
  let mssv = req.body.mssv;
  let maLopHocPhan = req.body.maLopHocPhan;
  let diemmoi = req.body.diemmoi;
     console.log(req.body);
  let response = await suaDiem(mssv, maLopHocPhan, diemmoi,'appUser');
  res.send(response)
   console.log(response)
})

// truy van tot nghiep
app.get('/truyVanTotNghiep', async(req, res) =>{
    let mssv = req.query.mssv;
    // console.log(req.)
    console.log(req.query.mssv);
    let response = await truyVanTotNghiep(mssv, 'appUser');
    res.send(response.toString());
})
// truyVan 
app.get('/truyVan',async(req, res) =>{
    let mssv = req.query.mssv;
     console.log(req.query.mssv);
    let response = await truyVan(mssv,'appUser');
    // console.log(response)
    res.send(response.toString());
})
// truyVanBlock
app.get('/truyVanBlock', async(req, res)=>{
  let blockID = req.query.blockID;
  console.log(req.query.blockID)
  let response = await truyVanBlock(blockID,'appUser');
  console.log("response"+JSON.stringify(response))
  res.send(JSON.stringify(response))
})
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
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
