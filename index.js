import express from 'express';
import dotenv from "dotenv";
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import extraServiceRoutes from './routes/extraServiceRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

conectarDB();

//Routing
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/reservation",reservationRoutes )
app.use("/api/rooms", roomRoutes  )
app.use("/api/extra-services", extraServiceRoutes )
//Routing


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});