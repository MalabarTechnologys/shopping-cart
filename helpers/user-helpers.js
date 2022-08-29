var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')

module.exports={
    doSignup:(userData)=>{
     return new Promise(async(resolve,reject)=>{
     userData.password=await bcrypt.hash(userData.password,10)
     db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                
          
                userData._id = data.insertedId;
                resolve(userData);

            })
           
        })
     
    }
}
