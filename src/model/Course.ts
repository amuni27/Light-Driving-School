import mongoose, {Schema} from "mongoose";

const CourseSchema: Schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    modules: [{
        _id: {type: Schema.Types.ObjectId, ref: 'Module'},
        number: {type: Number, unique: true},

    }],
    addedBy: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

const Course = mongoose.model('Course', CourseSchema);

export default Course;