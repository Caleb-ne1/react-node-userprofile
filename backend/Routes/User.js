const express = require("express");
const route = express.Router();

const User = require("../models/User");


route.post('/add-user', (req, res) => {
    const user = new User({
        profile_url: req.body.profile_url,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        job_title: req.body.job_title,
        email: req.body.email,
        biography: req.body.biography,
        Fb_link: req.body.Fb_link,
        github_link: req.body.github_link,
        linkedin_links: req.body.linkedin_links
    })

    user.save()
        .then((results) => {
            res.status(200).send(results)
        })
        .catch((err) => {
            console.log(err)
        })
})

route.get("/all", (req, res) => {
    User.find()
        .then((results) => {
            res.status(200).send(results)
        })
        .catch((err) => {
            console.log(err)
        })
})

route.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id)
    res.send(user);
})

route.put("/update-user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
})

module.exports = route;
