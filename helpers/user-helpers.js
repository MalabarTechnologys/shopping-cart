var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')
const { response } = require('../app')
const { ObjectId } = require('mongodb')
var objectId=require('mongodb').ObjectID

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,riject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                userData._id = data.insertedId;
                resolve(userData);
            })
        })
    },

    doLogin:(userData)=>{
        console.log(userData)
        return new Promise(async(resolve,riject)=>{
            let loginStatus=false
         let response={}
   let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.Email})
           if(user){
               bcrypt.compare(userData.password,user.password).then((status)=>{
                if(status){
                    console.log("login success")
                    response.user=user
                    response.status=true
                    resolve(response)
                }
                else{
                    console.log("user not found")
                    resolve({status:false})
                }
               })
            }else{
                console.log("login failed")
                resolve({status:false})
            }
        })
    },
      addToCart:(proId,userId)=>{
        return new Promise(async(resolve,riject)=>{
            let userCart=await db.get().collection(collection.CART_COLLECTION).findOne({user:objectId(userId)})
            if(userCart){
                //   db.get(collection.CART_COLLECTION)
                db.get().collection(collection.CART_COLLECTION)
                  .updateOne({user:ObjectId(userId)},
                    
                  {
                        
                        $push:{products:ObjectId(proId)}
                    
            
                  }
                  
                  ).then((response)=>{
                    resolve()
                  })
            }else{
                let cartObj={
                    user:objectId(userId),
                    products:[objectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response)=>{
                    resolve()
                })
            }
        })
      },
      getCartProducts:(userId)=>{
        return new Promise(async(resolve,riject)=>{
            let cartItems=await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match:{user:ObjectId(userId)}
                },
                {
                    $lookup:{
                        from:collection.PRODUCT_COLLECTION,
                       let:{prodList:'$products'},
                       pipeline:[
                        {
                           $match:{
                            $expr:{
                                $in:['$_id',"$$prodList"]
                            }
                           }
                        }
                       ],
                       as:'cartItems'


                       
                    }
                }
            ]).toArray()
            resolve(cartItems[0].cartItems)
        })
      },
      getCartCount:(userId)=>{
        return new Promise(async(resolve,riject)=>{
            let count=0;
            let cart=await db.get().collection(collection.CART_COLLECTION).findOne({user:ObjectId(userId)})
            if(cart){
                 count=cart.products.length
            }
            resolve(count)
        })
      }



}





