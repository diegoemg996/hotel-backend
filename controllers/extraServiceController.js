import ExtraService from "../models/ExtraService.js";

const createExtraService = async(req, res) => {

    const {name, price} = req.body;

    try {
        const extraService = new ExtraService({name, price})
        await extraService.save();
        res.status(200).json({ok: true, data: extraService});
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}


const getExtraServices = async(req, res) => {

    const extraServices = await ExtraService.find({});

    if(!extraServices){
        const error = new Error("No hay servicios extra");
        return res.status(404).json({msg: error.message});
    }

    res.status(200).json({ok: true, data: extraServices});

}

export{createExtraService};