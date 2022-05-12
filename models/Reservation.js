import mongoose from "mongoose";

const reservacionSchema = mongoose.Schema({

    reservationCode:{
        type: String
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    idRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    roomBooked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HotelRoom"
    },
    reservationDate: {
        type: Date
    },
    arriveDate: {
        type: Date,
        required: [true, "La fecha de llegada es obligatoria"]
    },
    leaveDate: {
        type: Date,
        required: [true, "La fecha de salida es obligatoria"]
    },
    hosts:{
        type: Number,
        required: [true, "El número de huéspedes es obligatorio"]
    },
    days:{
        type: Number,
        required: [true, "El número de días es obligatorio"]
    },
    extraServices:[
        {
            id_extraService: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ExtraService"
            },
            date:{
                type: Date,
                required: [true, "La fecha de servicio es obligatoria"]
            },
            hostConfirmation:{
                type: Boolean,
                default: false
            }
        }
    ],
    reservationActive: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    totalPaid: {
        type: Number,
        default: 0
    },
    totalToPay: {
        type: Number,
        default: 0
    }

},
{
    timestamps: true
}
);

const Reservacion = mongoose.model("Reservacion", reservacionSchema );
export default Reservacion;