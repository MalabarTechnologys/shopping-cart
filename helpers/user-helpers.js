var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt')

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
    }
}





