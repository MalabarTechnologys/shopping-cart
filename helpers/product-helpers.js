
var db=require('../config/connection')
var collection=require('../config/collections')
const { response } = require('../app')
const { ObjectID, ObjectId } = require('bson')
var objectId=require('mongodb').ObjectID
module.exports={

    addProduct:(product,callback)=>{
        
        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.insertedId)
             
            
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
     deleteProduct:(prodId)=>{
        return new Promise((resolve,riject)=>{
              db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(prodId)}).then((response)=>{
             
                resolve(response)
            })
        })
     },
    getProductDetails:(prodId)=>{
        return new Promise ((resolve,riject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(prodId)}).then((product)=>{
                resolve(product)
            })
        })
    },
    updateProduct:(prodId,proDetails)=>{
        return new Promise((resolve,riject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION)
            .updateOne({_id:ObjectId(prodId)},{
                $set:{
                    Name:proDetails.Name,
                    Description:proDetails.Description,
                    Price:proDetails.Price,
                    category:proDetails.category

                }
            }).then((response)=>{
                resolve()
            })
        })
    }

}