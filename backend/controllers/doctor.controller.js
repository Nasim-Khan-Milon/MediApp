import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Api for doctor Login
const loginDoctor = async (req, res) => {

    try {

        const {email, password} = req.body

        if(!email || !password) {
            return res.json({success: false, message: "Missing phone or password"})
        }

        // find doctor by email
        const [rows] = await db.execute(
            "SELECT * FROM doctors WHERE email = ?",
            [email]
        )

        const doctor = rows[0];

        if(!doctor) {
            return res.json({success: false, message: "Doctor does not exist"})
        }

        //compare password
        const isMatch = await bcrypt.compare(password, doctor.password_hash)

        if(!isMatch) {
            res.json({success: false, message: "Invalid credentials"})
        }

        //create jwt token
        const token = jwt.sign({id:doctor.id, type: "doctor"}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.json({success: true, token})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}






export {
    loginDoctor
}
