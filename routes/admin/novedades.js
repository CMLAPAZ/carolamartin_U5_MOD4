var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModels');
//var usuariosModel = require('./../../models/usuariosModels');

router.get('/', async function (req, res, next) {
var novedadesModel = require('../../models/novedadesModels');
  var novedades = await novedadesModel.getNovedades();

  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});//cierra el get
module.exports = router;