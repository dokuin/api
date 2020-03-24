'use strict';

module.exports = (err, req, res, next) => {
  try {
    switch (err.name) {
      case 'Unauthorized':
        res.json({
          statusCode: 401,
          message: err.message
        })
        break;

      case 'AuthenticationFailed':
        res.json({
          statusCode: 403,
          message: err.message
        })
        break;

      case 'NotFound':
        res.json({
          statusCode: 404,
          message: err.message
        })
        break;
    
      default:
        if(!err.errors){
          res.json({
            statusCode: 500,
            message: 'Server Error'
          })
        }else{
          res.json({
            statusCode: 400,
            message: err.errors
          })
        }
        break;
    }
  } catch (error) {
    res.json({
      statusCode: 500,
      message: 'Server Error'
    })
  }
};
