var express = require('express');
var router = express.Router();
//var usuariosModel = require('./../../models/usuariosModels');

router.get('/', function (req, res, next) {
  res.render('admin/novedades', {
    layout: 'admin/layout',
  });
});//cierra el get
module.exports = router;