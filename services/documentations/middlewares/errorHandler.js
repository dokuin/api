'use strict';

module.exports = (err, req, res, next) => {
  switch (err.status) {
    case 400:
      res.status(400).json({ message: err.message });
      break;

    case 401:
      res.status(401).json({ message: err.message });
      break;

    case 404:
      res.status(404).json({ message: err.message });
      break;

    default:
      res.status(500).json({ message: `Internal server error!` });
      break;
  }
};
