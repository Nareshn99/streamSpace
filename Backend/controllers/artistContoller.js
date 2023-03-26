import artistModel from "../models/artistModel.js";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';



export const createArtist = async (req, res) => {
    try {
        const { name, grammy, id } = req.body;

        //validation for name
        if (!name) {
            return res.status(400).send({ status: false, message: "Artist Name is Required!!!" })
        }
        //add id from uuid
        req.body.id = uuidv4()

        //create a new artist with data
        const data = await artistModel.create({ ...req.body });

        //send success response
        return res.status(201).send({ status: true, message: "Artist Added Successfully", data })
    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}



export const getArtist = async (req, res) => {
    try {
        const id = req.params.id;

        //validation for id
        if (!uuidValidate(id)) {
            return res.status(400).send({ status: false, message: "Invalid ArtistId!!!" })
        }

        //find arist data from artist model with id
        const data = await artistModel.findOne({ id });
        if (!data) {
            return res.status(404).send({ status: false, message: "Artist Detils not Found" })
        }

        //send success response
        return res.status(200).send({ status: true, message: "Artist Detils get Successfully", data })

    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}



export const getAllArtists = async (req, res) => {
    try {
        const data = await artistModel.find();
        if (data.length == 0) {
            return res.status(404).send({ status: false, message: "Artist Detils not Found" })
        }

        //send success response
        return res.status(200).send({ status: true, message: "All Artists Detils get Successfully", data })
    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}


export const updateArtist = async (req, res) => {
    try {
        const { name, grammy } = req.body;
        const id = req.params.id;

        //validation for ArtistId
        if (!uuidValidate(id)) {
            return res.status(400).send({ status: false, message: "Invalid ArtistId!!!" })
        }

        //find artist and update
        const data = await artistModel.findOneAndUpdate({ id: req.params.id }, { $set: { ...req.body } }, { new: true });
        if (!data) {
            return res.status(404).send({ status: false, message: "Artist not Found" })
        }

        //send success response
        return res.status(200).send({ status: true, message: "Artist update Successfully", data })

    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}


export const deleteArtist = async (req, res) => {
    try {
        const id = req.params.id;

        //validation for ArtistId
        if (!uuidValidate(id)) {
            return res.status(400).send({ status: false, message: "Invalid ArtistId!!!" })
        }

        //delete data with matching Id
        const data = await artistModel.findOneAndDelete({ id });
        if (!data) {
            return res.status(404).send({ status: false, message: "Artist not Found" })
        }

       //send success response
        return res.status(200).send({ status: true, message: "Artist Deleted Successfully" })

    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}
