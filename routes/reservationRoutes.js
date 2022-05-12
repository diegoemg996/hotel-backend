import express from "express";
import { nuevaReservacion, 
        totalAPagarReservaciones, 
        obtenerReservacionporId, 
        obtenerReservaciones, 
        obtenerReservacion,
        correoConfirmacion 
} from "../controllers/reservationController.js";
const router = express.Router();

//Creacion, registro y confirmacion

router.post('/', nuevaReservacion);
router.get('/search', obtenerReservaciones);
router.get('/search/:id', obtenerReservacionporId);
router.post('/total-to-pay', totalAPagarReservaciones);
router.get('/:id', obtenerReservacion);
router.post('/enviar-reservacion', correoConfirmacion);




export default router;