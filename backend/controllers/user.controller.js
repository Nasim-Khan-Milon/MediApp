import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// API to register a new user
const registerUser = async (req , res ) => {

    try {

        const { name, password, phone } = req.body

        //check for missing fields
        if(!name || !password || !phone) {
            return res.json({success: false, message:"Missing Details"})
        }

        //Validate phone number
        if(phone.length != 11) {
            return res.json({success: false, message:"Enter a valid phone number"})
        }

        // validate password
        if(password.length < 8) {
            return res.json({success: false, message:"Password must be at least 8 characters"})
        }

        // Check if phone already exists
        const [existing] = await db.execute(
            "SELECT id FROM users WHERE phone = ?",
            [phone]
        )

        if(existing.length > 0) {
            return res.json({success: false, message:"Phone already registered"})
        }

        // Hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Insert into database
        const [result] = await db.execute(
            "Insert Into users (name, phone, password_hash) VALUES (?, ?, ?)",
            [name, phone, hashedPassword]
        )

        // Create a token for the uesr
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        res.json({success: true, token})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}








export {
    registerUser
}
