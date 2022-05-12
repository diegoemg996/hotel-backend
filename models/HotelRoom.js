import mongoose from "mongoose";

const hotelRoomSchema = mongoose.Schema({ 
    idRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    typeRoom:{
        type: String,
        required: true,
        enum: {
            values: ['Sencilla', 'Doble', 'Imperial' ],
            message: '{VALUE} only has three values "Sencilla", "Doble" or "Imperial"'
        }
    },
    floor:{
        type: Number,
        required: [true, "El piso es obligatorio"],
    },
    number:{
        type: Number,
        required: [true, "El número es obligatorio"],
        unique: true 
    },
    available:{
        type: Boolean,
        default: true
    },
    datesBooked:[
        {
            type: Date,
            required: [true, "La fecha es obligatoria"]
        }
    ],

},
{
    timestamps: true
}
);

const HotelRoom = mongoose.model("HotelRoom", hotelRoomSchema );
export default HotelRoom;