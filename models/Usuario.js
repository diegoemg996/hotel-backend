import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
    email:{
        type: String,
        required: [true, "El email es obligatorio"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es obligatorio"],
        trim: true
    },
    firstName:{
        type: String,
        required: [true, "Al nombre es obligatorio"],
    },
    lastName:{
        type: String,
        required: [true, "Al apellido es obligatorio"],
    },
    role: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: {
            values: ['admin', 'user'],
            message: '{VALUE} only has two values "admin" or "user"'
        },
        default: 'user'
    },
    address:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    cellphone:{
        type: String
    },
    activeDiscounts:{
        type: Boolean,
        default: false
    },
    activeUser:{
        type: Boolean,
        default: true
    }

},
{
    timestamps: true
}
);


usuarioSchema.pre('save', async function(next){

    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema );
export default Usuario;