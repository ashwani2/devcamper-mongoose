const Bootcamp=require("../models/Bootcamp")
const ErrorResponse=require("../utils/errorResponse")
const asyncHandler=require("../middleware/async")

//@desc     get all bootcamps
//@route    GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps=async(req,res,next)=>{
  try {
    const bootcamps = await Bootcamp.find()
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data:bootcamps
    })
  } catch (error) {
    next(error)
  }

}

//@desc     get a single bootcamps
//@route    Get /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp=async(req,res,next)=>{
    try {
        const bootcamp= await Bootcamp.findOne({_id:req.params.id})

        if(!bootcamp){
           return  next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))          
        // If we don't apply return then it will give error that headers can't be set before client
                
        }

        res.status(200).json({
            success: true,
            data:bootcamp
        })
      } catch (error) {
        // res.status(400).json({
        //     success:false,
        //     error:error
        // })
        next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
      }
}

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps/:id
//@access    Public
exports.createBootcamp=async(req,res,next)=>{
    try {
        const bootcamp=await Bootcamp.create(req.body)
        res.status(201).json({
         success:true,
         data:bootcamp
        })   
    } catch (error) {
        next(error)
    }
   
}

//@desc     update a single bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access    Public
exports.updateBootcamp=async(req,res,next)=>{
    try {
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
      } catch (error) {
        next(error)
      }
}

//@desc     get a single bootcamps
//@route    Get /api/v1/bootcamps/:id
//@access    Public
exports.deleteBootcamp=async(req,res,next)=>{
    try {
        const bootcamp= await Bootcamp.findByIdAndDelete(req.params.id)

        if(!bootcamp){
            return  next(new ErrorResponse(`BootCamp not found with id of ${req.params.id}`,404))
        }

        res.status(200).json({
            success: true,
            data:{}
        })
      } catch (error) {
        next(error)
      }
}