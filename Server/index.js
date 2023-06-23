const express = require('express');
const app=express();
const mysql=require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'Empleados'
});
/**************Crear un Registro************************* */
app.post('/create',(req,res)=>{
    const nombre = req.body.nombre;
    const edad= req.body.edad;
    const pais= req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
        (err,result)=>{
            err ? console.log(err) : res.send(result)
        }
    );

});

app.listen(3001,()=>{
    console.log('hola mundo puerto 3001')
})

/**************listar los datos************************* */
app.get('/empleados', (req, res) => {
    db.query('SELECT * FROM empleados',
        (err, result) => {
            err ? console.log(err) : res.send(result)
        }
    );

});


/**************Actualizar datos************************* */
app.put('/update', (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais
    const cargo = req.body.cargo
    const anios = req.body.anios

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?', [nombre, edad, pais, cargo, anios,id],
        (err, result) => {
            err ? console.log(err) : res.send(result)
        }
    );

});
/**************Eliminar datos************************* */
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query('DELETE FROM empleados WHERE id=?', [id],
        (err, result) => {
            err ? console.log(err) : res.send(result)
        }
    );

});
