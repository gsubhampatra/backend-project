const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      massage: error.massage,
    });
  }
};

export { asyncHandler };

// const asyncHandler = (requestHandeler)=>{
//   return  (req,res,next) =>{
//          Promise.resolve(requestHandeler(req,res,next))
//          .catch((err)=>next(err))
//     }
// }
