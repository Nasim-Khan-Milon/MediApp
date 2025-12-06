import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Api for doctor Login
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body

        // if(email === process.env.DOCTOR_EMAIL && password === process.env.DOCTOR_PASSWORD) {

        //     const dToken  = jwt.sign({email,password}, process.env.JWT_SECRET, { expiresIn: '1d' })
        //     res.json({success: true, dToken })
        // } else {
        //     return res.json({success: false, message: "Missing phone or password"})
        // }

        // find doctor by email
        const [rows] = await db.execute(
            "SELECT * FROM doctors WHERE email = ?",
            [email]
        )

        const doctor = rows[0];

        if (!doctor) {
            return res.json({ success: false, message: "Doctor does not exist" })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, doctor.password_hash)

        if (!isMatch) {
            res.json({ success: false, message: "Invalid credentials" })
        }

        //create jwt token
        const dToken = jwt.sign({ id: doctor.id, type: "doctor" }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.json({ success: true, dToken })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Api to set doctor Availability
const setAvailability = async (req, res) => {

    try {

        const doctorId = req.doctor.doctorId;
        const { date, time } = req.body

        if (!date || !time) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // Try inserting the slot
        const [result] = await db.execute(
            `INSERT INTO availability_slots (doctor_id, slot_date, slot_time)
            VALUES (?, ?, ?)`,
            [doctor_id, date, time]
        );

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}




export {
    loginDoctor
}
