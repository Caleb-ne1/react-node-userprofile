const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    profile_url : String,
    first_name : {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        require: true
    },
    job_title: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    biography: String,
    Fb_link: String,
    github_link: String,
    linkedin_link: String
}, {timestamps : true})

const User = mongoose.model("user", userSchema);

module.exports = User;
