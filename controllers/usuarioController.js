
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";




const registrar = async(req, res) => {

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({ok: false,msg: error.message});
    }
    try {
        const usuario = new Usuario(req.body);
        const usuarioAlmacenado = await usuario.save();
        res.status(200).json({ok: true, data: "Usuario registrado"});

    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }

};


const autenticar = async (req, res) =>{

    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});

    if(!usuario){
        const error = new Error("El Usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    if(await usuario.comprobarPassword(password)){
        res.json({
            _id: usuario._id,
            firstName: usuario.firstName,
            lastName: usuario.lastName,
            role: usuario.role,
            token: generarJWT({
                _id: usuario._id,
            })

        })
    }else{
        const error = new Error("El password es incorrecto");
        return res.status(403).json({msg: error.message});
    }
}


const validarToken = async(req, res) =>{


    const {token} = req.body;

    if(!token){
        const error = new Error("Token no enviado");
        return res.status(401).json({msg: error.message});
    }

    let userId = "";

    console.log(token);

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        userId = payload._id;
    } catch (error) {

        console.log(error);
        
        return res.status(401).json({msg: "Token invalido"});
    }

    const usuario = await Usuario.findById(userId);

    if(!usuario){
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({msg: error.message});
    }

    res.json({

        _id: usuario._id,
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        role: usuario.role,
        token: generarJWT({
            _id: usuario._id,
        })

    })

}

const obtenerUsuario = async(req, res) => {

    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    if(!usuario){
        const error = new Error("Usuario no encontrado");
        return res.status(404).json({msg: error.message});
    }

    res.status(200).json(usuario);
}



const editarUsuario = async(req, res) =>{

    const {id} = req.params;

    const usuario = await Usuario.findById(id);

    console.log(req.body);

    if(!usuario){
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message});
    }

    try {
        const editUser = await Usuario.findByIdAndUpdate(id, req.body, {new:true});
        res.json(editUser);
    } catch (error) {
        console.log(error)
    }
}

const eliminarUsuario = async(req, res) =>{

    console.log("prueba")

    const {id} = req.params;

    const usuario = await Usuario.findById(id);

    if(!usuario){
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message});
    }

    try {
        const deletedUsuario = await Usuario.findByIdAndUpdate(id, {activeUser: false}, {new:true});
        res.json(deletedUsuario);
    } catch (error) {
        console.log(error)
    }


}


const obtenerUsuarios = async(req, res) => {


    const usuariosActivos = await Usuario.find({activeUser: true});
    
    res.json({
        usuariosActivos
    })

}



export {registrar, autenticar, obtenerUsuarios, editarUsuario, eliminarUsuario, validarToken, obtenerUsuario};