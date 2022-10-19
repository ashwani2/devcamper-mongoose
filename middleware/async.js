const asyncHandler=fn=>(req,res,next)=>       // We need this piece of code to avoid try catch
  Promise.resolve(fn(req,res,next)).catch(next)


  module.exports=asyncHandler