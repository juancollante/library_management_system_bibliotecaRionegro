import express from "express";
import Book from "../models/Book.js";
import User from "../models/User.js";
import BookTransaction from "../models/BookTransaction.js";

const router = express.Router();

/* Create a book reservation */
router.post("/reserve", async (req, res) => {
    try {
        const { bookId, userId, reservationDate } = req.body;

        // Validate input
        if (!bookId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Book ID and User ID are required"
            });
        }

        // Check if book exists and is available
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        if (book.bookCountAvailable <= 0) {
            return res.status(400).json({
                success: false,
                message: "Book is not available for reservation"
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Check if user already has a reservation for this book
        const existingReservation = await BookTransaction.findOne({
            bookId: bookId,
            borrowerId: userId,
            transactionType: "Reserved"
        });

        if (existingReservation) {
            return res.status(400).json({
                success: false,
                message: "User already has a reservation for this book"
            });
        }

        // Create reservation
        const newReservation = new BookTransaction({
            bookId: bookId,
            borrowerId: userId,
            bookName: book.bookName,
            borrowerName: user.userFullName,
            transactionType: "Reserved",
            fromDate: reservationDate || new Date(),
            toDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });

        const reservation = await newReservation.save();

        // Update book's transaction list
        await Book.findByIdAndUpdate(bookId, {
            $push: { transactions: reservation._id }
        });

        // Reduce available count
        await Book.findByIdAndUpdate(bookId, {
            $inc: { bookCountAvailable: -1 }
        });

        res.status(201).json({
            success: true,
            message: "Book reserved successfully",
            data: reservation
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error creating reservation",
            error: err.message
        });
    }
});

/* Get all reservations */
router.get("/all-reservations", async (req, res) => {
    try {
        const reservations = await BookTransaction.find({
            transactionType: "Reserved"
        })
        .populate("bookId")
        .populate("borrowerId")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching reservations",
            error: err.message
        });
    }
});

/* Get user's reservations */
router.get("/user-reservations/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;

        const reservations = await BookTransaction.find({
            borrowerId: userId,
            transactionType: "Reserved"
        })
        .populate("bookId")
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching user reservations",
            error: err.message
        });
    }
});

/* Cancel a reservation */
router.delete("/cancel/:reservationId", async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const { userId } = req.body;

        // Find the reservation
        const reservation = await BookTransaction.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            });
        }

        // Check if the reservation belongs to the user or if admin
        if (reservation.borrowerId.toString() !== userId && !req.body.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "You can only cancel your own reservations"
            });
        }

        // Remove reservation
        await BookTransaction.findByIdAndDelete(reservationId);

        // Increase available count of the book
        await Book.findByIdAndUpdate(reservation.bookId, {
            $inc: { bookCountAvailable: 1 },
            $pull: { transactions: reservationId }
        });

        res.status(200).json({
            success: true,
            message: "Reservation cancelled successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error cancelling reservation",
            error: err.message
        });
    }
});

/* Convert reservation to issued book */
router.put("/issue-reserved/:reservationId", async (req, res) => {
    try {
        const reservationId = req.params.reservationId;
        const { isAdmin, fromDate, toDate } = req.body;

        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Only admin can issue reserved books"
            });
        }

        // Find the reservation
        const reservation = await BookTransaction.findById(reservationId);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservation not found"
            });
        }

        if (reservation.transactionType !== "Reserved") {
            return res.status(400).json({
                success: false,
                message: "This is not a reservation"
            });
        }

        // Update reservation to issued
        const updatedTransaction = await BookTransaction.findByIdAndUpdate(
            reservationId,
            {
                transactionType: "Issued",
                fromDate: fromDate || new Date(),
                toDate: toDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Reserved book issued successfully",
            data: updatedTransaction
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error issuing reserved book",
            error: err.message
        });
    }
});

/* Get expired reservations */
router.get("/expired", async (req, res) => {
    try {
        const expiredReservations = await BookTransaction.find({
            transactionType: "Reserved",
            toDate: { $lt: new Date() }
        })
        .populate("bookId")
        .populate("borrowerId")
        .sort({ toDate: 1 });

        res.status(200).json({
            success: true,
            count: expiredReservations.length,
            data: expiredReservations
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching expired reservations",
            error: err.message
        });
    }
});

export default router;