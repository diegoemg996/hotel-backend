import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
   
    name:{
        type: String,
        required: [true, "El nombre es obligatorio"],
        enum: {
            values: ['Sencilla', 'Doble', 'Imperial' ],
            message: '{VALUE} only has three values "Sencilla", "Doble" or "Imperial"'
        }
    },
    description:{
        type: String,
        required: [true, "La descripción es obligatoria"]
    },
    price:{
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    features: [
        {
            type: String,
            required: [true, "La característica es obligatoria"],
            enum: {
                values : ['Wifi', 'Aire acondicionado', 'TV', 'Cafetera', 'Secador de pelo', 'Estacionamiento'],
            },
        }
    ],
    photos:[
        {
            url: {
            type: String,
            required: [true, "La foto es obligatoria"]
            }
        }
    ],
},
{
    timestamps: true
}
);

const Room = mongoose.model("Room", roomSchema );
export default Room;