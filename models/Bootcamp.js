const mongoose = require("mongoose")

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [100, 'Name cannot be more than 50 characters']
    },
    website: {
        type: String,
        match: [/https ? : \/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 
        'Please use a valid URL http or https']
    },
    phone:{
        type: String,
        match:[20,'Phone Number cannot be longer than 20 characters']
    },
    email:{
        type:String,
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please add a valid email address']
    },
    address:{
        type:String,
        required:[true,'Please add an address']
    },
    location: {
        //GEOJSON point
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true,
          index:'2dsphere'
        },
        formattedAddress:String,
        street:String,
        city:String,
        state:String,
        zipcode:String,
        country:String,
      },
      careers:{
        //Array of Strings
        type:[String],
        required:true,
        enum:[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
      },
      averageRating:{
        type:Number,
        min:[1,'Rating must be at least 1'],
        max:[10,'Rating cannot be more than 10']
      },    
      averageCost:Number,
      photo:{
        type:String,
        default:'nophoto.jpg'
      },
      housing:{
        type:Boolean,
        default:false
      },
      jobAssistance:{
        type:Boolean,
        default:false
      },
      jobGuarantee:{
        type:Boolean,
        default:false
      },
      acceptGi:{
        type:Boolean,
        default:false
      },
      createdAt:{
        type:Date,
        default:Date.now
      }
})

module.exports=mongoose.model('Bootcamp',BootcampSchema,'bootcamps')