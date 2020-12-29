const { Router } = require('express');
const router = Router();
const BD = require('../config/configdb');

//READ
router.get('/', async(req, res)=>{
    res.status(200);
})

router.get('/getUsuarios', async (req, res) => {

    sql = "select * from usuario";

    let result = await BD.Open(sql, [], false);
    
    Users = [];

    console.log(result);

    result.rows.map(user => {
        let userSchema = {
            "nombre": user[1],
            "correo": user[2],
            "contrasena": user[3],
        }

        Users.push(userSchema);
    })
    res.json(Users);
});


router.post('/registro', async (req, res) => {

    const { nombre, email, password} = req.body;

    sql = "insert into USUARIO(nombre, correo, contrasena) values (:nombre, :email, :password)";

    await BD.Open(sql, [nombre, email, password], true);

    res.status(200).json({
        "nombre": nombre
    })

    console.log("registro ingresado")
});

router.post('/login', async (req, res) => {
    const { email, password} = req.body;

    sql = "select * from USUARIO where correo=:email and contrasena=:password";

    console.log(email);



    let result = await BD.Open(sql, [email,password], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "nombre": user[1],
            "correo": user[2],
            "contrasena": user[3],
        }
        Users.push(userSchema);
    })

    let respv={"auth":"true"}
    let respf={"auth":"false"}

    console.log(Users);

    if(Users.length === 0){
        res.json(respf);
    }else{
        if(Users.correo = email){
            console.log("correo correcto");
            if(Users.contrasena=password){
                console.log("contrasena correca")
            }else{
                console.log("contrasena incorrecta")
            }
        }else{
            console.log("correo malo")
        }
        res.json(respv);
    }

});

router.get('/getProducto', async (req, res) => {

    sql = "SELECT * FROM PRODUCTO";

    let result = await BD.Open(sql, [], false);
    
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "nombreProducto": user[1],
            "precioProducto": user[2],
        }

        Users.push(userSchema);
    })
    res.json(Users);
});

router.post('/crearProducto', async (req, res) => {

    const { nombreProducto, precioProducto} = req.body;

    sql = "insert into producto(nombreProducto, precioProducto) values (:nombreProducto, :precioProducto)";

    await BD.Open(sql, [nombreProducto, precioProducto], true);

    res.status(200).json({
        "nombre": nombreProducto
    })

    console.log("registro ingresado")
});



router.get('/facturastop', async (req, res) => {

    sql = "select sum(detalle_factura.cantidad*producto.precioproducto ) as \"total\", detalle_factura.idfactura from detalle_factura inner join producto on producto.idproducto=detalle_factura.idproducto group by detalle_factura.idfactura order by \"total\" desc";

    let result = await BD.Open(sql, [], false);
    
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "total": user[0],
            "idfactura": user[1]
        }

        Users.push(userSchema);
    })
    res.json(Users);
});

module.exports = router;