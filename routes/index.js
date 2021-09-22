var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModels');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  
  novedades = novedades.splice(0, 5);
   //selecciona los primero 5 elementos del array
   novedades = novedades.map(novedad => {
     if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {width: 460, crop: 'fill'});
      return {
      ...novedad,
      imagen
      }
      }else { 
        return{
        ...novedad,
        imagen: ''
      }
    }
   });

  res.render('index', {
    novedades
  });
});//cierra el get

router.post('/',async(req,res,next) =>{
  
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;
  console.log(req.body);
  

  
  var obj = {
    to: '51c3c32b37-07442c@inbox.mailtrap.io',
    subject: 'CONTACTO WEB',
    html: nombre + " " + apellido + " " + "se contactó a través de la web y quiere más información a este correo : " + email + ". <br> Además, hizo este comentario : " + mensaje + ". <br> Su teléfono es : " + telefono
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);

  res.render('index', { 
    message: "Mensaje enviado correctamente",
  });

})
module.exports = router;