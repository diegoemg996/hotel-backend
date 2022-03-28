import express from "express";
import { autenticar,editarUsuario,eliminarUsuario,obtenerUsuarios,registrar } from "../controllers/usuarioController.js";
const router = express.Router();


//Creacion, registro y confirmacion

router.post('/', registrar);
router.post('/login', autenticar );
router.get('/get-all', obtenerUsuarios);
router.put('/edit/:id', editarUsuario);
router.put('/delete/:id', eliminarUsuario);




export default router;