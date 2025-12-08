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

// API to get doctor data
const getDoctorData = async (req, res) => {

    try {

        // Select all columns except password_hash and email
        const [rows] = await db.execute(
            `SELECT id, name, phone, specialization, institute, about, experience, fees, slots_booked, created_at 
            FROM doctors 
            LIMIT 1`
        );

        if (rows.length === 0) {
            return res.json({ success: false, message: "No doctor found" });
        }

        // Send first doctor only
        const doctor = rows[0];
        if (!doctor.slots_booked || typeof doctor.slots_booked !== 'object') {
            doctor.slots_booked = doctor.slots_booked ? JSON.parse(doctor.slots_booked) : {};
        }
        
        res.json({ success: true, doctor });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// API to show doctor all appointments
const doctorAppointments = async (req, res) => {

    try {

        const [results] = await db.execute(
            `SELECT id, slot_date, slot_time, status 
            FROM appointments
            WHERE status = 'Scheduled'
            ORDER BY slot_date ASC, slot_time ASC`,
        )

        res.json({ success: true, appointments: results })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel appointment by doctor
const cancelAppointment = async (req, res) => {
    try {
        const { doctorId } = req.doctor;
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.json({ success: false, message: "Appointment ID is required" });
        }

        const [rows] = await db.execute(
            "SELECT * FROM appointments WHERE id = ?",
            [appointmentId]
        );

        if (rows.length === 0) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        const appointment = rows[0];

        if (appointment.doctor_id !== doctorId) {
            return res.json({ success: false, message: "Unauthorized doctor action" });
        }

        await db.execute(
            "UPDATE appointments SET status = 'Cancelled' WHERE id = ?",
            [appointmentId]
        );

        return res.json({ success: true, message: "Appointment Cancelled by Doctor" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// API to complete appointment by doctor
const completeAppointment = async (req, res) => {
    try {
        const { doctorId } = req.doctor;
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.json({ success: false, message: "Appointment ID is required" });
        }

        const [rows] = await db.execute(
            "SELECT * FROM appointments WHERE id = ?",
            [appointmentId]
        );

        if (rows.length === 0) {
            return res.json({ success: false, message: "Appointment not found" });
        }

        const appointment = rows[0];

        if (appointment.doctor_id !== doctorId) {
            return res.json({ success: false, message: "Unauthorized doctor action" });
        }

        await db.execute(
            "UPDATE appointments SET status = 'Completed' WHERE id = ?",
            [appointmentId]
        );

        return res.json({ success: true, message: "Appointment Completed" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};





export {
    loginDoctor,
    getDoctorData,
    doctorAppointments,
    cancelAppointment,
    completeAppointment
}
