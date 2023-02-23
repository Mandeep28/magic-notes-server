const { customError } = require("../errors/customError")

const errorHandler = (err, req, res, next) =>{
<<<<<<< HEAD
 
  
=======
>>>>>>> 577d43e9129aa56dfbf5aed2f1d4f4d97ea00ce7
    if(err instanceof customError) {
      return  res.status(err.statusCode).json({msg: err.message});
    }

res.status(500).json({msg: "Something went wrong Please try again later!!!"});
}


module.exports = errorHandler;