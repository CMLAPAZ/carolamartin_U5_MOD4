var pool = require('./bd');

async function getNovedades() {
   
        var query = 'select * from novedades';
        var rows = await pool.query(query);
        return rows;
    }
 async function deleteNovedadById(id) {
   
        var query = "delete from novedades where id = ?"
        var rows = await pool.query(query, id);
        return rows;
    }
async function buscarNovedadById(busqueda) {
        var query = "select * from novedades where titulo like ? OR subtitulo like ? OR cuerpo like ?";
        var rows = await pool.query(query,['%' + busqueda + '%', '%' + busqueda +'%','%'+ busqueda + '%']);
        return rows;
    }

    async function insertNovedad(obj) {
        try {
            var query = "inset into novedades set ?";
            var rows = await pool.query(query,[obj]) 
            return rows;
        } catch (error) {
                console.log(error);
        } // cierra catch
        
    }//cierra insert

    /* modificar - traer una novedad por ID */
    async function getNovedadById(id) {
        var query = "select * from novedades where id=?";
        var rows = await pool.query(query, [id]);
        return rows[0];
    }

/* modificar actualizar los datos */
async function modificarNovedadById(obj, id) {
    try {
        var query = "update novedades set ? where id=?";
        var rows = await pool.query(query,[obj,id]);
        return rows;
    } catch (error) {
            throw error;
    }
} // cierra modidificar - update


module.exports = { getNovedades, deleteNovedadById, insertNovedad, getNovedadById,
     modificarNovedadById, buscarNovedadById}
    
