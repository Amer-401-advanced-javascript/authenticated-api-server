'use strict';

const express = require('express');
const route = express.Router();
// const categoriesModel = require('../lib/models/categories/categories-model');
// const productsModel = require('../lib/models/products/products-model');
let paramsHandler = require('../middleware/paramshandler');
let bearerAuth = require('../lib/auth/middleware/bearer-auth');
let acl = require('../lib/auth/middleware/authorize');





route.param('model',paramsHandler);

route.get('/:model', bearerAuth, handleGetAll);
route.get('/:model/:id', bearerAuth, getHandler);
route.post('/:model', bearerAuth, acl('create'), postHandler);
route.put('/:model/:id', bearerAuth, acl('update'), putHandler);
route.delete('/:model/:id', bearerAuth, acl('delete'), deleteHandler);



function handleGetAll (req, res, next){
  req.model.read()
    .then(data => {      
      res.status(200).json(data);
    }).catch(next);
}

function getHandler( req, res, next) {
  let id = req.params.id;
  req.model.read(id)
    .then( data => {
      res.status(200).json(data);
    }).catch(next);
}
function postHandler(req, res, next){
  let addRecord = req.body;
  req.model.create(addRecord)
    .then(data => {
      res.status(201).json(data);
    }).catch(next);
}

function putHandler(req, res, next){
  let id = req.params.id;
  let record = req.body;
  req.model.update(id, record)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

function deleteHandler(req, res, next){  
  let id = req.params.id;
  req.model.delete(id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}



module.exports = route;

