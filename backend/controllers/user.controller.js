import db from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// API to register a new user
const registerUser = async (req, res) => {

    try {

        const { name, password, phone } = req.body

        //check for missing fields
        if (!name || !password || !phone) {
            return res.json({ success: false, message: "Missing Details" })
        }

        //Validate phone number
        if (phone.length != 11) {
            return res.json({ success: false, message: "Enter a valid phone number" })
        }

        // validate password
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        // Check if phone already exists
        const [existing] = await db.execute(
            "SELECT id FROM users WHERE phone = ?",
            [phone]
        )

        if (existing.length > 0) {
            return res.json({ success: false, message: "Phone already registered" })
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
        res.json({ success: true, token })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// Api for user Login
const loginUser = async (req, res) => {

    try {

        const { phone, password } = req.body

        if (!phone || !password) {
            return res.json({ success: false, message: "Missing phone or password" })
        }

        // find user by phone
        const [rows] = await db.execute(
            "SELECT * FROM users WHERE phone = ?",
            [phone]
        )

        const user = rows[0];

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        //compare password
        const isMatch = await bcrypt.compare(password, user.password_hash)

        if (!isMatch) {
            res.json({ success: false, message: "Invalid credentials" })
        }

        //create jwt token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.json({ success: true, token })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

function convertTo24Hour(time) {
    const [timePart, ampm] = time.split(" ");
    let [hour, minute] = timePart.split(":");

    hour = parseInt(hour);

    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, '0')}:${minute}:00`;
}


// API to book appointment
const bookAppointment = async (req, res) => {

    try {

        const userId = req.user.userId
        const { slotDate, slotTime } = req.body

        const time24 = convertTo24Hour(slotTime);

        if (!slotDate || !slotTime) {
            return res.json({ success: false, message: "Missing date or time" })
        }

        const [results] = await db.execute(
            "SELECT * FROM appointments WHERE patient_id = ? AND slot_date = ? AND slot_time = ?",
            [userId, slotDate, time24]
        )

        if (results.length > 0) {
            return res.json({ success: false, message: "Already booked this appointment" })
        }

        const [result] = await db.execute(
            "INSERT INTO appointments (patient_id, slot_date, slot_time) VALUES (?, ?, ?)",
            [userId, slotDate, time24]
        )

        res.json({ success: true, message: "Appointment booked successfully" })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to show user appointment
const userAppointments = async (req, res) => {

    try {

        const userId = req.user.userId

        const [results] = await db.execute(
            `SELECT slot_date, slot_time, status 
            FROM appointments 
            WHERE patient_id = ?
            ORDER BY slot_date DESC, slot_time DESC`,
            [userId]
        )

        res.json({ success: true, appointments: results })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}




export {
    registerUser,
    loginUser,
    bookAppointment,
    userAppointments
}
