'use strict';

module.exports = (err, req, res, next) => {
  switch (err.status) {
    case 400:
      res.status(400).json({ message: err.message });
      break;

    case 401:
      res.status(401).json({ message: err.message });
      break;

    case 403:
      res.status(401).json({ message: err.message });
      break;

    case 404:
      res.status(404).json({ message: err.message });
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
};
