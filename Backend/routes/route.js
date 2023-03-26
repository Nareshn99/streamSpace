import express from 'express';
import {createArtist, deleteArtist, getAllArtists, getArtist, updateArtist } from '../controllers/artistContoller.js';
import { createTrack, deletetrack, getAlltracks, getTrack, updateTrack } from '../controllers/trackController.js';

const router=express.Router();


//artist Api's
router.post("/artist",createArtist)
router.get("/artist/:id",getArtist);
router.get("/artist",getAllArtists);
router.put("/artist/:id",updateArtist);
router.delete("/artist/:id",deleteArtist);


//track Api's
router.post("/track",createTrack)
router.get("/track/:id",getTrack);
router.get("/track",getAlltracks);
router.put("/track/:id",updateTrack);
router.delete("/track/:id",deletetrack);


//error handling for non existing api's
router.all("/**",(req,res)=>{
    res.send({status:false,message:"Requested API does not exist"})
})


export default router;