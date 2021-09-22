var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModels');
//var usuariosModel = require('./../../models/usuariosModels');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);
//listar

router.get ('/', async function (req, res, next) {
  var novedadesModel = require('../../models/novedadesModels');
  novedades = await novedadesModel.getNovedades();
  var novedades
  if (req.query.q === undefined) {
    novedades = await novedadesModel.getNovedades();
  } else {
    novedades = await novedades.buscarNovedades(req.query.q);
  };


  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
      const imagen = cloudinary.images(novedad.img_id, {
        width: 80,
        height: 80,
        crop: 'fill' 
      });
        res.render('admin/novedades', {
        layout: 'admin/layout',
        usuario: req.session.nombre,
        novedades,
        is_search: req.query.q !== undefined,
        q: req.query.q
        });
      }
    }) 
    });  //cierra el get

//agregar una novedad
router.post('/agregar', async (req, res, next) => {
  try {

  /*    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.temFilePath)).public_id;
    } */
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo !="") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.redirect('/admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      }) 

    }
  } catch (error){
    console.log(error)
    res.render('admin/agregar', {
        layout: 'admin/layout', 
        error: true,
        message: 'No se cargo la novedad'
      })
    
  }

  });

  // modificar
  router.get('/modificar/:id', async ( req, res, next) =>{

    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.redirect('/admin/novedades', {
      layout: 'admin/layout',
      novedad
    })
  });//cierra modificar
  /* update */
  router.get('/modificar/:id', async ( req, res, next) => {
    try {
      var obj ={
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo
      }
      console.log(obj) //para ver si trae los datos
      await novedadesModel.modificarNovedadById(obj, req.body.id);
      res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error)
        res.render('admin/modificar', {
          layout:
           'admin/layout',
          error: true,
          message: 'No se moidficó la novedad'
        })
    } // cierra el catch
   });//cierra el post

    

// borrar una novedad
router.get('/eliminar/:id', async ( req, res, next) =>{
  var id = req.params.id;
  await novedadesModel.deleteNovedadById(id);
  res.redirect('/admin/novedades')
});//cierra eliminar

// agregar la pagina - formulario
router.get('/agregar', ( req, res, next) =>{
    res.render('admin/agregar', {
      layout: 'admin/layout'
    }) //cierra render
 });// cierra Get


module.exports = router;