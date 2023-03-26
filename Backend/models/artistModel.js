import mongoose from 'mongoose';


const artistSchema = new mongoose.Schema({
    id: { 
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    grammy: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const artistModel = mongoose.model("Artist", artistSchema);

export default artistModel;