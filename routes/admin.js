var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"royal Canin Puppy 1 kg",
      category:"Dog food",
      Discription:"Number One Quality",
      Image:"https://images-eu.ssl-images-amazon.com/images/I/41237jNPwRS._SX300_SY300_QL70_FMwebp_.jpg"
    },
    {
      name:"N & d Puppy 1 kg",
      category:"Dog food",
      Discription:"Number One Quality",
      Image:"https://m.media-amazon.com/images/I/71SWN1UlxjL._SY879_.jpg"
    },
    {
      name:"pedigree pro",
      category:"Dog food",
      Discription:"Number One Quality",
      Image:"https://m.media-amazon.com/images/I/41JzKCYG+SL._SX300_SY300_.jpg"

    },
    {
      name:"Drols focus",
      category:"Dog food",
      Discription:"Number One Quality",
      Image:"https://m.media-amazon.com/images/I/61D9g9TtnQL._SX679_.jpg"
    }
  ]  
  res.render('admin/view-products',{admin:true,products})
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
 

  productHelpers.addProduct(req.body,(id)=>{
    let image=req.files.Image
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err);
      }
    })
   
  })
})


module.exports = router;