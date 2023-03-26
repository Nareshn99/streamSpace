import trackModel from "../models/trackModel.js";
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import artistModel from "../models/artistModel.js";



export const createTrack = async (req, res) => {
    try {
        const { name, artistId, duration,id } = req.body;

        //validation for all feilds
        if (!name) {
            return res.status(400).send({ status: false, message: "Track Name is Required!!!" })
        }
        if (!artistId) {
            return res.status(400).send({ status: false, message: "artistId is Required!!!" })
        }
        if (!uuidValidate(artistId)) {
            return res.status(400).send({ status: false, message: "Invalid artistId!!!" })
        }

        //find artist with theire id
        let artist=await artistModel.findOne({id:artistId});
        if(!artist){
            return res.status(404).send({ status: false, message: "Artist not Found" })
        }

        //set artist mongodb id in artist id for ref and populate
        req.body.artistId=artist._id;

        if (!duration) {
            return res.status(400).send({ status: false, message: "duration is Required!!!" })
        }
        if (typeof duration !== "number") {
            return res.status(400).send({ status: false, message: "duration is in Number Only" })
        }

        //set id from uuidv4
        req.body.id = uuidv4()

        //create new entry
        const data = await trackModel.create({ ...req.body });

        //send success response
        return res.status(201).send({ status: true, message: "Track Added Successfully", data })
    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}





export const getTrack = async (req, res) => {
    try {
        const id = req.params.id;

        //validation for trackId
        if (!uuidValidate(id)) {
            return res.status(400).send({ status: false, message: "Invalid trackId!!!" })
        }

        //find track with matching trackid
        const data = await trackModel.findOne({ id });
        if (!data) {
            return res.status(404).send({ status: false, message: "Track not Found" })
        }

        //populate data from artist collection
        let popu=await trackModel.findOne({_id:data._id}).populate("artistId")


        //send success response
        return res.status(200).send({ status: true, message: "Track get Successfully", data:popu })

    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}





export const getAlltracks = async (req, res) => {
    try {
        const data = await trackModel.find();
        if (data.length == 0) {
            return res.status(404).send({ status: false, message: "Track not Found" })
        }

        //send success response
        return res.status(200).send({ status: true, message: "All Tracks get Successfully", data })
    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}




export const updateTrack = async (req, res) => {
    try {
        const { name, artistId, duration } = req.body;

        const id = req.params.id;

        //validation for trackId
        if (!uuidValidate(id)) {
            return res.status(400).send({ status: false, message: "Invalid trackId!!!" })
        }

        //validation for fields
        if (artistId) {
            if (!uuidValidate(artistId)) {
                return res.status(400).send({ status: false, message: "Invalid artistId!!!" })
            }
        }

        if (duration) {
            if (typeof duration !== "number") {
                return res.status(400).send({ status: false, message: "duration is in Number Only" })
            }
        }


        //find track with id and update 
        const data = await trackModel.findOneAndUpdate({ id }, { $set: { ...req.body } }, { new: true });
        if (!data) {
            return res.status(404).send({ status: false, message: "Track not Found" })
        }

        //send success response
        return res.status(200).send({ status: true, message: "Track update Successfully", data })

    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}




export const deletetrack = async (req, res) => {
    try {
        const id = req.params.id;

        //validation for trackId
        if (!uuidValidate(id)) {
            return res.status(400).send({ status: false, message: "Invalid trackId!!!" })
        }

        //find track with id and delete
        const data = await trackModel.findOneAndDelete({ id });
        if (!data) {
            return res.status(404).send({ status: false, message: "Track not Found" })
        }

        //send success response
        return res.status(200).send({ status: true, message: "Track Deleted Successfully" })

    }
    catch (e) {
        return res.status(500).send({ status: false, message: e.message })
    }
}
