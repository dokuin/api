'use strict';

const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;

const { Project } = require('../models/index');

class Authorization {
  static authorizeProject(req, res, next) {
    const { userId, projectId } = req.params;
    Project.findById({
      _id: ObjectId(projectId)
    })
      .then(project => {
        if (!project) {
          throw createError(404, { name: 'NotFound', message: `Project not found!` });
        } else if (project.userId !== ObjectId(userId)) {
          const projectMembers = project.members.filter(member => {
            return member._id === ObjectId(userId);
          });
          if (projectMembers.length <= 0) {
            throw createError(401, { name: 'Unauthorized', message: `You are not authorized!` });
          } else {
            next();
          }
        } else {
          next();
        }
      })
      .catch(err => {
        next(err);
      });
  }
}

const authorize = Authorization;

module.exports = authorize;
