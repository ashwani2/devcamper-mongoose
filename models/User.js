const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Add a Name']
    },
    email: {
        type: String,
        required:[true,'Please Add a Email'],
        unique:true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
    role:{
        type:String,
        enum:['user','publisher'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'Please Add a Password'],
        minlength:6,
        select:false
    },
    resestPasswordToken:String,
    resetPasswordExpire:Date,
    created_at:{
        type:Date,
        default:Date.now
    }  
})

// Encrypt password using bcrypt
UserSchema.pre('save',async function(next){
    
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)

})

// Sign JWT and Return
UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

// Match user entered password to hashed pssword in Database
UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
module.exports =mongoose.model('User',UserSchema,'users')