import express from "express";
import { autenticar,editarUsuario,eliminarUsuario,obtenerUsuario,obtenerUsuarios,registrar, validarToken } from "../controllers/usuarioController.js";
const router = express.Router();


//Creacion, registro y confirmacion

router.post('/', registrar);
router.post('/login', autenticar );
router.post('/verify-token', validarToken );
router.get('/get-all', obtenerUsuarios);
router.get('/get-user/:id', obtenerUsuario);
router.put('/edit/:id', editarUsuario);
router.put('/delete/:id', eliminarUsuario);




export default router;