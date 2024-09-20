const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    profile_url : String,
    first_name : String,
    last_name: String,
    job_title: String,
    email : {
        type: String,
        required: true
    },
    biography: String,
    Fb_link: String,
    github_link: String,
    linkedin_link: String,
    password: String
}, {timestamps : true})

const User = mongoose.model("user", userSchema);

module.exports = User;
