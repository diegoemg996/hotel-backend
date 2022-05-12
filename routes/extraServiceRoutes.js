import express from "express";
import { createExtraService} from "../controllers/extraServiceController.js";
const router = express.Router();

//Creacion, registro y confirmacion

router.post('/', createExtraService);





export default router;