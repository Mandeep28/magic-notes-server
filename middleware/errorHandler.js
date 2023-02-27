const { customError } = require("../errors/customError")

const errorHandler = (err, req, res, next) =>{

    // if(err instanceof customError) {
    //   console.log(err);
    //   return  res.status(err.statusCode).json({status: false, msg: err.message});

    // }
    console.log(err);
    res.status(500).json({status: false,msg: err.message});
}


module.exports = errorHandler;