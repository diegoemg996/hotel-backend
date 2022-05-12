import express from "express";
import { nuevoTipoDeCuarto, obtenerCuartos, crearCuarto, cuartosDisponibles } from "../controllers/roomController.js";
const router = express.Router();


//Creacion, registro y confirmacion

router.post('/', nuevoTipoDeCuarto);
router.post('/crear-cuarto', crearCuarto);
router.get('/', obtenerCuartos);
router.get('/disponibles', cuartosDisponibles);

export default router;