'use strict';

const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;

const { User } = require('../services/users/models');
const { Project } = require('../services/projects/models');
const { Documentation } = require('../services/documentations/models');

class Authorization {
  static authorizeUser(req, res, next) {
    const { userId } = req.params;
    const { _id } = req.user;
    User.findById({
      _id: ObjectId(userId)
    })
      .then(user => {
        if (!user) {
          throw createError(404, { message: `User not found!` });
        } else if (user._id !== _id) {
          throw createError(401, { message: `You are not authorized!` });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static authorizeProject(req, res, next) {
    const { userId, projectId } = req.params;
    Project.findById({
      _id: ObjectId(projectId)
    })
      .then(project => {
        if (!project) {
          throw createError(404, { message: `Project not found!` });
        } else if (project.userId !== ObjectId(userId)) {
          const projectMembers = project.members.filter(member => {
            return member._id === ObjectId(userId);
          });
          if (projectMembers.length <= 0) {
            throw createError(401, { message: `You are not authorized!` });
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

  static authorizeDocumentation(req, res, next) {
    const { userId, documentationId } = req.params;
    Documentation.findById({
      _id: ObjectId(documentationId)
    })
      .then(documentation => {
        if (!documentation) {
          throw createError(404, { message: `Documentation not found!` });
        } else if (documentation.userId !== userId) {
          throw createError(401, { message: `You are not authorized!` });
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
