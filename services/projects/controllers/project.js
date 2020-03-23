'use strict';

const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;
const { Project } = require('../models');

class ProjectController {
  static findAll(req, res, next) {
    const { userId } = req.params;
    Project.find({
      _id: userId
    })
      .then(projects => {
        if (!projects) {
          throw createError(404, { message: `Project not found!` });
        } else {
          res.status(200).json({ projects });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    const { userId, projectId } = req.params;
    Project.find({
      _id: ObjectId(projectId),
      userId: ObjectId(userId)
    })
      .then(project => {
        if (!project) {
          throw createError(404, { message: `Project not found!` });
        } else {
          res.status(200).json({ project });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static create(req, res, next) {
    const { userId } = req.params;
    const { name, owner, members, documentations } = req.body;
    Project.create({ userId, name, owner, members, documentations })
      .then(project => {
        res.status(201).json({ project });
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    const { userId, projectId } = req.params;
    const { name, owner, members, documentations } = req.body;
    Project.update(
      {
        _id: ObjectId(projectId),
        userId: ObjectId(userId)
      },
      {
        name,
        owner,
        members,
        documentations
      }
    )
      .then(project => {
        res.status(200).json({ project });
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const { userId, projectId } = req.params;
    Project.deleteOne({
      _id: ObjectId(projectId),
      userId: ObjectId(userId)
    })
      .then(project => {
        res.status(200).json({ project });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = ProjectController;
