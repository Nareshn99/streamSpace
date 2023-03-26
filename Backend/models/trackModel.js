import mongoose from 'mongoose';


const trackSchema = new mongoose.Schema({
    id: { 
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    artistId: {
        type: mongoose.Types.ObjectId,
        ref: "Artist"
    },
    duration: {
        type: Number
    }
}, { timestamps: true });


const trackModel = mongoose.model("Track", trackSchema);

export default trackModel;