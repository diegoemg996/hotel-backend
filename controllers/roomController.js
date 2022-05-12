import HotelRoom from "../models/HotelRoom.js";
import Room from "../models/Room.js";

const nuevoTipoDeCuarto = async (req, res) => {
    const {
        name,
        description,
        price,
        photos
    } = req.body;

    const cuarto = new Room({
        name,
        description,
        price,
        photos
    });

    try {
        const cuartoAlmacenado = await cuarto.save();
        res.json(cuartoAlmacenado);
    } catch (error) {
        res.status(400).json(error);
    }
}

const crearCuarto = async (req, res) => {

    const {
        idRoom,
        floor,
        number,
        typeRoom
    } = req.body;

    const cuarto = new HotelRoom({
        idRoom,
        floor,
        number,
        typeRoom
    });

    try {
        const cuartoAlmacenado = await cuarto.save();
        res.json(cuartoAlmacenado);
    } catch (error) {
        res.status(400).json(error);
    }
}

const cuartosDisponibles = async (req, res) => {

    const cuartosSencillos = await HotelRoom.find({ available: true, typeRoom: "Sencilla" }).populate("idRoom", ["price", "name"]);
    const cuartosDobles = await HotelRoom.find({ available: true, typeRoom: "Doble" }).populate("idRoom", ["price", "name"]);
    const cuartosImperiales = await HotelRoom.find({ available: true, typeRoom: "Imperial" }).populate("idRoom", ["price", "name"]);
    const data ={
        cuartosSencillos : cuartosSencillos.length,
        cuartosDobles : cuartosDobles.length,
        cuartosImperiales : cuartosImperiales.length
    }
    try {
        res.status(200).json({ok: true, data});
    } catch (error) {
        res.status(400).json(error);
    }
}


const obtenerCuartos = async (req, res) => {
    try {
        const cuartos = await Room.find();
        res.status(200).json({
            ok: true,
            data: cuartos
        });
    } catch (error) {
        res.status(400).json(error);
    }
}


export {nuevoTipoDeCuarto, obtenerCuartos, crearCuarto, cuartosDisponibles};