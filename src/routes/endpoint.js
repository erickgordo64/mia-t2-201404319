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
            "coreo": user[2],
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

    sql = "select * from usuario where correo=:email";

    console.log(email);

    let result = await BD.Open(sql, [email], false);
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

    if (Users.nombre === "true") {
        console.log("usuario no validado");
    } else {
        if (Users.contrasena = password) {
            res.json(respv);
        } else {
            console.log(respf);
        }
        console.log("usuario validado");
    }

});





module.exports = router;