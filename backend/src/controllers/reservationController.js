const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');

// Reuse email logic or import a helper, but for now specific to reservation
const sendReservationEmail = async (reservation) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Admin
            subject: `New Reservation: ${reservation.name}`,
            text: `
                New Reservation Details:
                Name: ${reservation.name}
                Date: ${reservation.date}
                Time: ${reservation.time}
                Guests: ${reservation.guests}
                Special Request: ${reservation.specialRequest || 'None'}
                User ID: ${reservation.user}
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Reservation email sent');
    } catch (error) {
        console.error('Email sending failed:', error);
        // Don't throw, just log
    }
};

exports.createReservation = async (req, res) => {
    try {
        const { name, date, time, guests, specialRequest } = req.body;

        const reservation = await Reservation.create({
            user: req.user.id,
            name,
            date,
            time,
            guests,
            specialRequest
        });

        // Send email asynchronously
        sendReservationEmail(reservation);

        res.status(201).json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getMyReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).sort({ createdAt: -1 });
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateReservationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const reservation = await Reservation.findById(req.params.id).populate('user', 'email name');

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        reservation.status = status;
        await reservation.save();

        // Send email notification to user
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: reservation.user.email,
            subject: `Reservation Status Update: ${status}`,
            text: `
                Hello ${reservation.name},

                Your reservation status has been updated to: ${status}.
                
                Details:
                Date: ${reservation.date}
                Time: ${reservation.time}
                
                Thank you for choosing us!
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Status update email sent to user');
        } catch (emailError) {
            console.error('Failed to send status email:', emailError);
        }

        res.json(reservation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
