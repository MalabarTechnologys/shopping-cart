var express = require('express');
var router = express.Router();

/* GET home page. */
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
   //this is passing page to intex hbs
  res.render('index', { products,admin:false });
});

module.exports = router;

     

