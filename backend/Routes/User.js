const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {generateToken, validateToken } = require("../Middleware/jwt");
const User = require("../models/User");

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 16)
        .then((hashedPassword) => {
            const newUser = new User({
                email: email,
                password: hashedPassword
            });

            return newUser.save();
        })
        .then(() => {
            res.status(201).json({ message: 'User registered successfully!' });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error registering user', details: err });
        });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).send("User not found");
        }
        
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send("Wrong username or password");
        }

        const accessToken = generateToken(user);
        res.cookie("access-token", accessToken, {
            maxAge: 2592000000,
            httpOnly: true
        });
        res.status(200).send("User logged in successfully");

    } catch (err) {
        res.status(500).json({ error: 'Error logging in user', details: err });
    }
});

router.post('/add-user', (req, res) => {
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

router.get("/profile", validateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).send("User not found");
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving user data', details: err });
    }
});


router.put("/update-user/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send(user)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
