const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt')

const { HandleError } = require('./Error');
const Accounts = require('../model/model');

router.post('/register', async(req, res) => {
    try {
        const {full_name, email, password, confirm_password} = req.body;
        if(!full_name||!email||!password) return res.status(400).json({error_message: "All fields are required"})
        if(password !== confirm_password) return res.status(400).json({error_message: "Password do not match"})
        const validated = Accounts.validate(req.body)
    
        if(validated){
            const new_user = await Accounts({full_name, email, password})
            await new_user.save()
            return res.status(200).json({new_user})
        }
    } catch (error) {
        return HandleError(error, res)
    }
})


router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error_message: "All fields are required" });
  
        let user = await Accounts.findOne({ email: email });
        if (!user) return res.status(400).json({ error_message: "Email is not register" });
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ error_message: "Invalid Credentials" });
        
        req.session._email = user.email;

        return res.status(200).json({ message: "Your login is done" });
  
    } catch (error) {
        return HandleError(error, res);
    }
});

const CheckCookiesAuthenticate = async (req, res, next) => {
    try {
        // const session_id = req.cookies['_eid'];
        // if (!session_id) return res.status(401).json({ error_message: "Unauthorized: Please log in again" });
        
        // if (session_id !== req.sessionID) return res.status(400).json({ error_message: "Session ID mismatch" });
        
        const userEmail = req.session['_email'];
        if (!userEmail) return res.status(400).json({ error_message: "User email not found in session" });
        
        const currentUser = await Accounts.findOne({ email: userEmail });
        if (!currentUser) return res.status(400).json({ error_message: "User does not exist" });
        
        next(); 
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ error_message: "Internal Server Error" });
    }
};


router.get('/profile', async (req, res) => {
    try {
        const userEmail = req.session['_email'];
        const currentUser = await Accounts.findOne({ email: userEmail });
        
        if (!currentUser) {
            return res.status(404).json({ error_message: "User not found" });
        }
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error)
        return HandleError(error, res);
    }
});

router.post('/logout', CheckCookiesAuthenticate, async(req, res) => {
    try {
        req.session.destroy();
        res.clearCookie()
        return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        return HandleError(error, res);
    }
});


module.exports = router;