import mongoose, {Schema} from 'mongoose';

const AudioSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true},
    description: {type: String, required: true},
})
const Audio = mongoose.model('Audio', AudioSchema);