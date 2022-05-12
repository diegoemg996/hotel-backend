import generateUniqueID from "../helpers/generarID.js";
import { validateCC } from "../helpers/validateCC.js";
import HotelRoom from "../models/HotelRoom.js";
import Reservacion from "../models/Reservation.js";
import Room from "../models/Room.js";
import Usuario from "../models/Usuario.js";
import nodemailer from 'nodemailer';



const totalAPagarReservaciones = async (req, res) => {

    const {days, hosts, idRoom} = req.body;

    const room = await Room.findById(idRoom);

    const total = days * room.price * hosts;

    res.status(200).json({ok: true, total});

}


const obtenerReservaciones = async (req, res) => {

    const reservacion = await Reservacion.find({})
    .populate("idRoom", ["price", "name", "photos"])
    .populate("idUser", ["firstName", "lastName"])
    .populate("roomBooked", ["floor", "number", "typeRoom"]);

    if(!reservacion){
        const error = new Error("No hay reservaciones");
        return res.status(404).json({msg: error.message});
    }

    res.status(200).json({ok: true, data: reservacion});
}



const obtenerReservacionporId = async (req, res) => {

    const {id} = req.params;

    const reservacion = await Reservacion.find({idUser: id})
    .populate("idRoom", ["price", "name", "photos"])
    .populate("idUser", ["firstName", "lastName"])
    .populate("roomBooked", ["floor", "number", "typeRoom"]);

    if(!reservacion){
        const error = new Error("Reservacion no encontrada");
        return res.status(404).json({msg: error.message});
    }

    res.status(200).json({ok: true, data: reservacion});

}


const obtenerReservacion = async (req, res) => {

    const {id} = req.params;

    const reservacion = await Reservacion.findById(id).populate("idRoom", ["price", "name", "photos"])
    .populate("idUser", ["firstName", "lastName"])
    .populate("roomBooked", ["floor", "number", "typeRoom"]);

    if(!reservacion){
        const error = new Error("Reservacion no encontrada");
        return res.status(404).json({msg: error.message});
    }

    res.status(200).json({ok: true, data: reservacion});

}



const nuevaReservacion = async (req, res) => {

    const {
        idUser,
        idRoom,
        arriveDate,
        leaveDate,
        hosts,
        days,
        totalPaid,
        datesBooked,
        card
    } = req.body;


    if(!validateCC(card)){
        const error = new Error("Tarjeta no válida");
        return res.status(404).json({msg: error.message});
    }
/* 
    const user = await Usuario.findById(idUser);

    await user.updateOne({$push: {card}}) */

    const cuartoDisponible = await HotelRoom.find({ idRoom })

    let tempCuarto;

    cuartoDisponible.forEach((cuarto) => {
        if(!cuarto.datesBooked.some((fecha) => datesBooked.includes(fecha))){
            tempCuarto = cuarto;
            return;
        }
    })

    if(!tempCuarto){
        const error = new Error("No hay cuartos disponibles");
        return res.status(404).json({msg: error.message});
    }

    await tempCuarto.updateOne({$push: { datesBooked : [...datesBooked ] }});

    const reservacion = new Reservacion({
        idUser,
        idRoom,
        roomBooked: tempCuarto._id,
        reservationDate: new Date(),
        arriveDate,
        leaveDate,
        hosts,
        extraServices: [],
        reservationCode: generateUniqueID(),
        days,
        totalPaid,
        isPaid: true
    });

    try {
        const reservacionAlmacenada = await reservacion.save();
        res.status(200).json(reservacionAlmacenada);
    } catch (error) {
        res.status(400).json(error);
    } 
}

const correoConfirmacion = async(req, res) => {

    const { reservationCode,email} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CORREO,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: 'eduardomenglez@gmail.com',
        to: `${email}`,
        subject: 'Confirmacion de reservacion',
        html: `<h2>Tu reservación se ha realizado con exito</h2>
                <h3>El código de tu reservación es el siguiente</h3>
                <h3>${reservationCode}</h3>
                <p>Favor de presentarlo el diá de tu reservación</p>
                </br>
                <p>Gracias por tu preferencia</p>
                <p>Hotel Posada Real</p>
            `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
            return res.status(400).json({
                ok: false,
                msg: 'Error al enviar el correo'
            })
        }
        return res.status(200).json({
            ok: true,
            msg: 'Correo enviado'
        })
    });   
}

export {
    nuevaReservacion, 
    totalAPagarReservaciones, 
    obtenerReservacionporId, 
    obtenerReservaciones, 
    obtenerReservacion,
    correoConfirmacion
};