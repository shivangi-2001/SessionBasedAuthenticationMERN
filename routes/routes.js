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
        if (!user) return res.status(400).json({ error_message: "Invalid Crendentials" });


       let isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch) return res.status(400).json({error_message: "Invalid Crendentials" })
        
       req.session._email = user.email;
       res.cookie('_eid', req.session.id)
       return res.status(200).json({ message: "You loggin is done" });
  
      } catch (error) {
        return HandleError(error, res);
      }
})

const CheckCookiesAuthenticate =  async(req, res, next) => {
    let session_id = req.cookies['_eid']
    if(!session_id) return res.status(401).json({ error_message: "Unauthorized: Session ID not found" });

    if(session_id !== req.sessionID) return res.status(400).json({error_message: "session is not found"})
    current_user = req.session['_email']
    let found = await Accounts.findOne({email: current_user})
    if(!found) return res.status(400).json({error_message: "User is not longer exist"})
    next()
}

router.get('/profile', CheckCookiesAuthenticate, async (req, res) => {
    try {
        const userEmail = req.session['_email'];
        const currentUser = await Accounts.findOne({ email: userEmail });

        if (!currentUser) {
            return res.status(404).json({ error_message: "User not found" });
        }
        return res.status(200).json(currentUser);
    } catch (error) {
        console.error(error);
        return HandleError(error, res);
    }
});

router.post('/logout', CheckCookiesAuthenticate, async(req, res) => {
    try{
        req.session.destroy()
        return res.status(200).json("Succesfully logout")
    } catch (error){
        return HandleError(error, res)
    }
})

module.exports = router;