const Bootcamp=require("../models/Bootcamp")
const geocoder=require("../utils/geocoder")
const ErrorResponse=require("../utils/errorResponse")
const asyncHandler=require("../middleware/async")

//@desc     get all bootcamps
//@route    GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps=asyncHandler(async(req,res,next)=>{
    let query;
    // copy req.query
    const reqQuery={...req.query}

    //create query String
    let queryStr=JSON.stringify(reqQuery)

    // below line will insert $ prefix in gt|gte|lt|lte|in
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>`$${match}`)

    //Finding resource
    query=Bootcamp.find(JSON.parse(queryStr))

    //Executing our resource
    const bootcamps = await query
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data:bootcamps
    })
})

//@desc     get a single bootcamps
//@route    Get /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp=asyncHandler(async(req,res,next)=>{
        const bootcamp= await Bootcamp.findOne({_id:req.params.id})

        if(!bootcamp){
           return  next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))          
        // If we don't apply return then it will give error that headers can't be set before client      
        }
        res.status(200).json({
            success: true,
            data:bootcamp
        })
})

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps/:id
//@access    Public
exports.createBootcamp=asyncHandler(async(req,res,next)=>{
    
        const bootcamp=await Bootcamp.create(req.body)
        res.status(201).json({
         success:true,
         data:bootcamp
        })   
})

//@desc     update a single bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access    Public
exports.updateBootcamp=asyncHandler(async(req,res,next)=>{
   
        const bootcamp= await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!bootcamp){
            return  next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }
        res.status(200).json({
            success: true,
            data:bootcamp
        })
     
})

//@desc     get a single bootcamps
//@route    DELETE /api/v1/bootcamps/:id
//@access    Public
exports.deleteBootcamp=asyncHandler(async(req,res,next)=>{
  
        const bootcamp= await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return  next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }

        res.status(200).json({
            success: true,
            data:{}
        })
      
})

//@desc     Get bootcamps within a radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access    Private

exports.getBootcampsInRadius=asyncHandler(async(req,res,next)=>{
    const {zipcode, distance}=req.params

    // get lat lang from geocoder
    const loc =await geocoder.geocode(zipcode)
    const lat=loc[0].latitude
    const lang=loc[0].longitude

    //calc radius  using radians
    //Divide distance by radius of earth
    // Earth -radius =3,963mi or 6378km

    const radius=distance/3963
    const bootcamps=await Bootcamp.find({
        location:{$geoWithin:{$centerSphere:[[lang,lat],radius]}}
    })

    res.status(200).json({
        success:true,
        count:bootcamps.length,
        data:bootcamps
    })
})