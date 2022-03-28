
import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/Usuario.js";



const registrar = async(req, res) => {

    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({email});

    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }
    try {
        const usuario = new Usuario(req.body);
        const usuarioAlmacenado = await usuario.save();
        res.json(usuarioAlmacenado);

    } catch (error) {
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
            token: generarJWT(usuario._id)

        })
    }else{
        const error = new Error("El password es incorrecto");
        return res.status(403).json({msg: error.message});
    }

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



export {registrar, autenticar, obtenerUsuarios, editarUsuario, eliminarUsuario};