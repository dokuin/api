"use strict"

const createError = require('http-errors');
const { ObjectId } = require('mongoose').Types;
const { Endpoint } = require('../models');

class EndpointController {

  static findAll(req, res, next){
    const { projectId } = req.params
    Endpoint.find({
      projectId: ObjectId(projectId)
    })
    .then(endpoints => {
      // if(endpoints.length === 0){
      //   throw createError(404, { name: 'NotFound', message: `Endpoint not found!` });
      // }else{
      res.status(200).json({ endpoints });
      // }
    })
    .catch(next)
  }

  static findOne(req, res, next){
    const { projectId, endpointId } = req.params
    Endpoint.findOne({
      _id: ObjectId(endpointId),
      projectId: ObjectId(projectId)
    })
    .then(endpoint => {
      if(!endpoint){
        throw createError(404, { name: 'NotFound', message: `Endpoint not found!` });
      }else{
        res.status(200).json({ endpoint })
      }
    })
    .catch(next)
  }

  static create(req, res, next){
    const { projectId } = req.params
    const { method, path, description, headers, queryParams, body } = req.body
    Endpoint
    .create({ projectId, method, path, description, headers, queryParams, body })
    .then(endpoint => {
      res.status(201).json({ endpoint })
    })
    .catch(next)
  }

  static update(req, res, next){
    const { projectId, endpointId } = req.params
    const { method, path, description, headers, queryParams, body } = req.body

    Endpoint.findOneAndUpdate(
      {
      _id: ObjectId(endpointId),
      projectId: ObjectId(projectId)
     },
     {
      method, 
      path, 
      description, 
      headers, 
      queryParams, 
      body
     },
     {
       new: true
     }
    )
    .then(endpoint => {
      res.status(200).json({ endpoint });
    })
    .catch(next)
  }

  static patchResponse(req, res, next){
    const { projectId, endpointId } = req.params
    const { response, errorResponse } = req.body

    Endpoint.findOneAndUpdate(
     { _id: ObjectId(endpointId),projectId: ObjectId(projectId)},
     { response, errorResponse },
     { new: true }
    )
    .then(endpoint => {
      res.status(200).json({ endpoint })
    })
    .catch(next)
  }

  static delete(req, res, next){
    const { projectId, endpointId } = req.params

    Endpoint.findOneAndDelete({
      _id: ObjectId(endpointId),
      projectId: ObjectId(projectId)
    })
    .then(endpoint => {
      res.status(200).json({ endpoint })
    })
    .catch(next)
  }
}

module.exports = EndpointController