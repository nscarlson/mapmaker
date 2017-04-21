import mongoose from 'mongoose'
var Schema = mongoose.Schema;

// create User Schema
var User = new Schema({
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String,
        email: String,
        image: String
    }
});

export default mongoose.model('users', User);
