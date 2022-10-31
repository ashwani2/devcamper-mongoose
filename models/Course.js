const mongoose = require("mongoose")

const CourseSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'Please Add a Course Title']
    },
    description:{
        type:String,
        required:[true,'Please Add a Course Description']
    },
    weeks:{
        type:String,
        required:[true,'Please Add Number of weeks']
    },
    tuition:{
        type:Number,
        required:[true,'Please Add a tuition cost']
    },
    minimumSkill:{
        type:String,
        required:[true,'Please Add a minimum skill'],
        enum:['beginner','intermediate','advanced']
    },
    scholarshipAvailable:{
        type:Boolean,
        deafult:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    bootcamp:{
        type:mongoose.Schema.ObjectId,
        ref:'Bootcamp',
        required:true
    }
})

// Static method to get average of course tuitions

// static method directly get applied on the schema and pull out all the values from DB
CourseSchema.statics.getAverageCost=async function(bootcampId){
// console.log('Calculating Avg Cost..'.blue)

const obj=await this.aggregate([
    {
        $match:{ bootcamp:bootcampId}
    },
    {
        $group:{
            _id:'$bootcampId',
            averageCost:{$avg:'$tuition'}
        }
    }
])
try {
    await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
        averageCost:Math.ceil(obj[0].averageCost/10)*10
    })
} catch (error) {
    console.log(error)
}
}

// call Average cost after save

CourseSchema.post('save',function(){
this.constructor.getAverageCost(this.bootcamp)
})

// call Average cost before remove
CourseSchema.pre('save',function(){
    this.constructor.getAverageCost(this.bootcamp)
})

module.exports=mongoose.model('Course',CourseSchema,'courses')