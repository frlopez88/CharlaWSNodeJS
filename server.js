const mysql = require('mysql');
const express = require('express');
const app = express();
// Importacion de Librerias 

app.use(express.json());

// GET sirve para gener una consulta sql de seleccion
app.get('/api/animal/', (req, res)=>{

    let con = mysql.createConnection({
        host: "127.0.0.1", 
        user: "root", 
        password : "passa1234b", 
        database : "bdnode"

    });

    let sql = " select * from tbl_animal ";

    con.connect( function(err){

        if(err) throw err;
        con.query( sql, function(err, result, fields ){

            if(err) throw err;
            res.send(result);

        } );


    } );

});

app.get('/api/animal/:id', (req, res)=>{

    let con = mysql.createConnection({
        host: "127.0.0.1", 
        user: "root", 
        password : "passa1234b", 
        database : "bdnode"

    });

    let sql = " select * from tbl_animal where id = ? ";

    let arregloValores = [req.params.id];

    con.connect( function(err){

        if(err) throw err;
        con.query( sql, arregloValores ,  function(err, result, fields ){

            if(err) throw err;
            res.send(result);

        } );


    } );


} );

app.post('/api/animal/', (req, res)=>{

    let con = mysql.createConnection({
        host: "127.0.0.1", 
        user: "root", 
        password : "passa1234b", 
        database : "bdnode"

    });

    let sql = " insert into tbl_animal ( nombre, sonido ) values (?, ?) ";
    let arregloValores = [ req.body.nombre, req.body.sonido ];

    let objetoNuevo = {
        id : 0, 
        nombre : req.body.nombre, 
        sonido: req.body.sonido, 
        mensaje : "Insercion Exitosa"
    };

    con.query( sql, arregloValores, function(err, result){

        if(err){
            objetoNuevo.mensaje = "Error de Insercion "+err.sqlMessage;
            console.log(err);
            res.send(objetoNuevo);
        }else{
            objetoNuevo.id = result.insertId;

            res.send(objetoNuevo);

        }

    } );

} );

app.delete( '/api/animal/:id', (req, res)=>{

    let con = mysql.createConnection({
        host: "127.0.0.1", 
        user: "root", 
        password : "passa1234b", 
        database : "bdnode"

    });

    let sql = " delete from tbl_animal where id = ? ";

    let arregloValores = [ req.params.id ];

    let objetoBorrado = {
        id : req.params.id, 
        mensaje : "Borrado Exitoso"
    };

    con.query(sql, arregloValores, function(err, result){

        if(err){
            objetoBorrado.mensaje = "Borrado Erroneo "+err.sqlMessage;
            console.log(err);
            res.send(objetoBorrado);
        }else{
            res.send(objetoBorrado);
        }

    } );

} );

app.put('/api/animal/:id', (req, res)=>{

    let con = mysql.createConnection({
        host: "127.0.0.1", 
        user: "root", 
        password : "passa1234b", 
        database : "bdnode"

    });

    let sql = " update  tbl_animal set nombre = ? , sonido = ? where id = ? ";

    objetoActualizado= {
        id : req.params.id, 
        nombre : req.body.nombre, 
        sonido: req.body.sonido, 
        mensaje : "Actualizacion exitosa"

    };

    let arregloValores = [ req.body.nombre, req.body.sonido,req.params.id ];

    con.query(sql, arregloValores, function(err, result){

        if(err){
            objetoActualizado.mensaje = "Error de Actualizacion "+ err.sqlMessage;
            console.log(err);
            res.send(objetoActualizado);
        }else{
            res.send(objetoActualizado);
        }

    });

})


app.listen(8080);