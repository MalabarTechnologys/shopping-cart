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
     
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{    
                let loginStatus=false
                let response={}                                                   // checking the email in database
               let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
                if(user){
                    bcrypt.compare(userData.password,user.password).then((status)=>{
                        if(status){
                            console.log("login success");
                            response.user=user
                            response.status=true
                            resolve(response)
                        }else{
                            console.log("login failed")
                            resolve({status:false})
                        }
                    })
                }else{
                    console.log('login failed')
                    resolve({status:false})
                }

        })
    }

}



