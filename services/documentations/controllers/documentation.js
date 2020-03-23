'use strict';

const { ObjectId } = require('mongoose').Types;
const createError = require('http-errors');

const { Documentation } = require('../models');

class DocumentationController {
  static findAll(req, res, next) {
    const { userId } = req.params;
    Documentation.find({
      _id: ObjectId(userId)
    })
      .then(documentations => {
        if (!documentations) {
          throw createError(404, { message: `Documentation not found!` });
        } else {
          res.status(200).json({ documentations });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static findOne(req, res, next) {
    const { userId, documentationId } = req.params;
    Documentation.findOne({
      _id: ObjectId(documentationId),
      userId: ObjectId(userId)
    })
      .then(documentation => {
        if (!documentation) {
          throw createError(404, { message: `Documentation not found!` });
        } else {
          res.status(200).json({ documentation });
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static create(req, res, next) {
    const { userId } = req.params;
    const { name, owner, rawContent, type, endpoints } = req.body;
    Documentation.create({ userId, name, owner, rawContent, type, endpoints })
      .then(documentation => {
        res.status(201).json({ documentation });
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    const { userId, documentationId } = req.params;
    const { name, owner, rawContent, type, endpoints } = req.body;
    Documentation.update(
      {
        _id: ObjectId(documentationId),
        userId: ObjectId(userId)
      },
      { name, owner, rawContent, type, endpoints }
    )
      .then(documentation => {
        res.status(200).json({ documentation });
      })
      .catch(err => {
        next(err);
      });
  }

  static delete(req, res, next) {
    const { userId, documentationId } = req.params;
    Documentation.deleteOne({
      _id: ObjectId(documentationId),
      userId: ObjectId(userId)
    })
      .then(documentation => {
        res.status(200).json({ documentation });
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = DocumentationController;
