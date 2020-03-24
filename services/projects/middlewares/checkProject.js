const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;
const { Project } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { ownerId, projectId } = req.params;
    const project = await Project.findOne({
      _id: ObjectId(projectId),
      ownerId: ObjectId(ownerId)
    })
    if(!project){
      throw createError(404, { name: 'NotFound', message: `Project not found!` });
    }else{
      next()
    }
  } catch (error) {
    next(error)
  }
}