import express from "express";
import BookTransaction from "../models/BookTransaction.js";
import Book from "../models/Book.js";
import User from "../models/User.js";

const router = express.Router();

/* Get all notifications for admin */
router.get("/admin", async (req, res) => {
    try {
        const notifications = [];

        // Get overdue books
        const overdueTransactions = await BookTransaction.find({
            transactionType: "Issued",
            toDate: { $lt: new Date() }
        }).populate("bookId").populate("borrowerId");

        overdueTransactions.forEach(transaction => {
            const daysOverdue = Math.ceil((new Date() - new Date(transaction.toDate)) / (1000 * 60 * 60 * 24));
            notifications.push({
                type: "overdue",
                priority: daysOverdue > 7 ? "high" : "medium",
                title: "Overdue Book",
                message: `${transaction.bookName} is ${daysOverdue} days overdue`,
                details: {
                    book: transaction.bookName,
                    borrower: transaction.borrowerName,
                    dueDate: transaction.toDate,
                    daysOverdue: daysOverdue,
                    transactionId: transaction._id
                },
                createdAt: transaction.toDate
            });
        });

        // Get books with low stock
        const lowStockBooks = await Book.find({
            bookCountAvailable: { $lte: 2, $gt: 0 }
        });

        lowStockBooks.forEach(book => {
            notifications.push({
                type: "low_stock",
                priority: book.bookCountAvailable === 1 ? "high" : "medium",
                title: "Low Stock Alert",
                message: `${book.bookName} has only ${book.bookCountAvailable} copies available`,
                details: {
                    book: book.bookName,
                    availableCount: book.bookCountAvailable,
                    bookId: book._id
                },
                createdAt: book.updatedAt
            });
        });

        // Get expired reservations
        const expiredReservations = await BookTransaction.find({
            transactionType: "Reserved",
            toDate: { $lt: new Date() }
        }).populate("bookId").populate("borrowerId");

        expiredReservations.forEach(reservation => {
            notifications.push({
                type: "expired_reservation",
                priority: "medium",
                title: "Expired Reservation",
                message: `Reservation for ${reservation.bookName} has expired`,
                details: {
                    book: reservation.bookName,
                    borrower: reservation.borrowerName,
                    expiredDate: reservation.toDate,
                    reservationId: reservation._id
                },
                createdAt: reservation.toDate
            });
        });

        // Sort notifications by priority and date
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        notifications.sort((a, b) => {
            if (a.priority !== b.priority) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching admin notifications",
            error: err.message
        });
    }
});

/* Get user notifications */
router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const notifications = [];

        // Get user's overdue books
        const userOverdueTransactions = await BookTransaction.find({
            borrowerId: userId,
            transactionType: "Issued",
            toDate: { $lt: new Date() }
        }).populate("bookId");

        userOverdueTransactions.forEach(transaction => {
            const daysOverdue = Math.ceil((new Date() - new Date(transaction.toDate)) / (1000 * 60 * 60 * 24));
            notifications.push({
                type: "overdue",
                priority: daysOverdue > 7 ? "high" : "medium",
                title: "Overdue Book",
                message: `Your book "${transaction.bookName}" is ${daysOverdue} days overdue`,
                details: {
                    book: transaction.bookName,
                    dueDate: transaction.toDate,
                    daysOverdue: daysOverdue,
                    transactionId: transaction._id
                },
                createdAt: transaction.toDate
            });
        });

        // Get books due soon (within 3 days)
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

        const dueSoonTransactions = await BookTransaction.find({
            borrowerId: userId,
            transactionType: "Issued",
            toDate: { 
                $gte: new Date(),
                $lte: threeDaysFromNow
            }
        }).populate("bookId");

        dueSoonTransactions.forEach(transaction => {
            const daysUntilDue = Math.ceil((new Date(transaction.toDate) - new Date()) / (1000 * 60 * 60 * 24));
            notifications.push({
                type: "due_soon",
                priority: daysUntilDue <= 1 ? "high" : "low",
                title: "Book Due Soon",
                message: `Your book "${transaction.bookName}" is due in ${daysUntilDue} day(s)`,
                details: {
                    book: transaction.bookName,
                    dueDate: transaction.toDate,
                    daysUntilDue: daysUntilDue,
                    transactionId: transaction._id
                },
                createdAt: new Date()
            });
        });

        // Get user's reservations that are ready for pickup
        const readyReservations = await BookTransaction.find({
            borrowerId: userId,
            transactionType: "Reserved",
            toDate: { $gte: new Date() }
        }).populate("bookId");

        readyReservations.forEach(reservation => {
            notifications.push({
                type: "reservation_ready",
                priority: "medium",
                title: "Reservation Ready",
                message: `Your reserved book "${reservation.bookName}" is ready for pickup`,
                details: {
                    book: reservation.bookName,
                    reservationDate: reservation.fromDate,
                    expiryDate: reservation.toDate,
                    reservationId: reservation._id
                },
                createdAt: reservation.fromDate
            });
        });

        // Sort notifications by priority and date
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        notifications.sort((a, b) => {
            if (a.priority !== b.priority) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        res.status(200).json({
            success: true,
            count: notifications.length,
            data: notifications
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching user notifications",
            error: err.message
        });
    }
});

/* Get notification count for user */
router.get("/count/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const [overdueCount, dueSoonCount, reservationCount] = await Promise.all([
            // Overdue books
            BookTransaction.countDocuments({
                borrowerId: userId,
                transactionType: "Issued",
                toDate: { $lt: new Date() }
            }),
            // Books due in 3 days
            BookTransaction.countDocuments({
                borrowerId: userId,
                transactionType: "Issued",
                toDate: { 
                    $gte: new Date(),
                    $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                }
            }),
            // Active reservations
            BookTransaction.countDocuments({
                borrowerId: userId,
                transactionType: "Reserved",
                toDate: { $gte: new Date() }
            })
        ]);

        const totalCount = overdueCount + dueSoonCount + reservationCount;

        res.status(200).json({
            success: true,
            data: {
                total: totalCount,
                overdue: overdueCount,
                dueSoon: dueSoonCount,
                reservations: reservationCount
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error fetching notification count",
            error: err.message
        });
    }
});

/* Send reminder for overdue books */
router.post("/send-reminders", async (req, res) => {
    try {
        const { isAdmin } = req.body;

        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Only admin can send reminders"
            });
        }

        // Get all overdue books
        const overdueTransactions = await BookTransaction.find({
            transactionType: "Issued",
            toDate: { $lt: new Date() }
        }).populate("borrowerId");

        // Here you would integrate with email service to send actual reminders
        // For now, we'll just return the list of users who should receive reminders
        
        const reminders = overdueTransactions.map(transaction => ({
            userId: transaction.borrowerId._id,
            userEmail: transaction.borrowerId.email,
            userName: transaction.borrowerName,
            bookName: transaction.bookName,
            daysOverdue: Math.ceil((new Date() - new Date(transaction.toDate)) / (1000 * 60 * 60 * 24))
        }));

        res.status(200).json({
            success: true,
            message: `Reminders prepared for ${reminders.length} users`,
            data: reminders
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error sending reminders",
            error: err.message
        });
    }
});

export default router;