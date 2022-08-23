var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"pedigree pro",
      category:"Dog Food",
      description:"Number One Qulity",
      Image:"https://cdn.shopify.com/s/files/1/0086/0795/7054/products/edigreePROExpertNutritionLactatingPregnantMother_Pup_3-12Weeks_DryDogFoodFood_510x@2x.jpg?v=1636462181"
    },
    {
      name:"Royal canin",
      category:"Dog Food",
      description:"Number One Qulity",
      Image:"https://images-eu.ssl-images-amazon.com/images/I/41gUl1uuqgL._SX300_SY300_QL70_FMwebp_.jpg"
    
      

    },
    {
      name:"Drols Focus",
      category:"Dog Food",
      description:"Number One Qulity",
      Image:"https://images-eu.ssl-images-amazon.com/images/I/41gUl1uuqgL._SX300_SY300_QL70_FMwebp_.jpg"
    
    },
    {
      name:"N & d",
      category:"Dog Food",
      description:"Number One Qulity",
      Image:"https://m.media-amazon.com/images/I/71SWN1UlxjL._SY879_.jpg"
    
    }
  

  ]
  res.render('index', { products,admin:false });
});

module.exports = router;
