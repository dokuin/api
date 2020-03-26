'use strict';

const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;
const { Project } = require('../models');

class ProjectController {
  static findAll(req, res, next) {
    const { ownerId } = req.params;
    Project.find({
      ownerId: ObjectId(ownerId)
    })
      .then(projects => {
        if (!projects) {
          throw createError(404, { name: 'NotFound', message: `Project not found!` });
        } else {
          res.status(200).json({ projects });
        }
      })
      .catch(next);
  }

  static findOne(req, res, next) {
    const { ownerId, projectId } = req.params;
    Project.findOne({
      _id: ObjectId(projectId),
      ownerId: ObjectId(ownerId)
    })
      .then(project => {
        res.status(200).json({ project });
      })
      .catch(next);
  }

  static create(req, res, next) {
    const { ownerId } = req.params;
    const { name, baseURL, description, members, endpoints } = req.body;
    Project.create({ name, ownerId, baseURL, description, members, endpoints })
      .then(project => {
        res.status(201).json({ project });
      })
      .catch(next);
  }

  static update(req, res, next) {
    const { ownerId, projectId } = req.params;
    const { name, baseURL, description, members, endpoints } = req.body;
    Project.findOneAndUpdate(
      {
        _id: ObjectId(projectId),
        ownerId: ObjectId(ownerId)
      },
      {
        name, 
        baseURL, 
        description, 
        members, 
        endpoints
      },
      {
        new: true
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
    const { ownerId, projectId } = req.params;
    Project.findOneAndDelete({
      _id: ObjectId(projectId),
      ownerId: ObjectId(ownerId)
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
