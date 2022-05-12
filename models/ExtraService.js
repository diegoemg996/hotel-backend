import mongoose from "mongoose";

const extraServicesSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    price: {
        type: Number,
        required: [true, "El precio es obligatorio"],
    },
});

const ExtraService = mongoose.model("ExtraService", extraServicesSchema );
export default ExtraService;