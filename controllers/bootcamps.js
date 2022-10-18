//@desc     get all bootcamps
//@route    GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps=(req,res,next)=>{
    res.status(200).json({
        sucess: true,
        msg: "Show ALL bootcamps",
    });
}

//@desc     get a single bootcamps
//@route    Get /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp=(req,res,next)=>{
    res.status(200).json({
        sucess: true,
        msg: `Show bootcamp with ${req.params.id}`,
    });
}

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps/:id
//@access    Public
exports.createBootcamp=(req,res,next)=>{
    res.status(200).json({
        sucess: true,
        msg: "Create bootcamps",
    });
}

//@desc     update a single bootcamps
//@route    PUT /api/v1/bootcamps/:id
//@access    Public
exports.updateBootcamp=(req,res,next)=>{
    res.status(200).json({
        sucess: true,
        msg: `Update Bootcamp ${req.params.id}`,
    });
}

//@desc     get a single bootcamps
//@route    Get /api/v1/bootcamps/:id
//@access    Public
exports.deleteBootcamp=(req,res,next)=>{
    res.status(200).json({
        sucess: true,
        msg: `Delete Bootcamp ${req.params.id}`,
    });
}