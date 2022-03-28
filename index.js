import express from 'express';
import dotenv from "dotenv";
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

conectarDB();

//Routing
app.use("/api/usuarios", usuarioRoutes)
//Routing


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});