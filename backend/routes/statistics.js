import express from "express";
import Book from "../models/Book.js";
import User from "../models/User.js";
import BookTransaction from "../models/BookTransaction.js";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

/* Get dashboard statistics */
router.get("/dashboard", async (req, res) => {
    try {
        const [
            totalBooks,
            availableBooks,
            totalUsers,
            activeTransactions,
            totalCategories,
            overdueTransactions
        ] = await Promise.all([
            Book.countDocuments(),
            Book.countDocuments({ bookStatus: "Available", bookCountAvailable: { $gt: 0 } }),
            User.countDocuments(),
            BookTransaction.countDocuments({ transactionType: "Issued" }),
            BookCategory.countDocuments(),
            BookTransaction.countDocuments({
                transactionType: "Issued",
                toDate: { $lt: new Date() }
            })
        ]);

        const borrowedBooks = totalBooks - availableBooks;

        res.status(200).json({
            success: true,
            data: {
                totalBooks,
                availableBooks,
                borrowedBooks,
                totalUsers,
                activeTransactions,
                totalCategories,
                overdueTransactions
            }
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching dashboard statistics", 
            error: err.message 
        });
    }
});

/* Get books statistics by category */
router.get("/books-by-category", async (req, res) => {
    try {
        const categories = await BookCategory.find({}).populate("books");
        
        const categoryStats = categories.map(category => ({
            categoryName: category.categoryName,
            totalBooks: category.books.length,
            availableBooks: category.books.filter(book => 
                book.bookStatus === "Available" && book.bookCountAvailable > 0
            ).length
        }));

        res.status(200).json({
            success: true,
            data: categoryStats
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching category statistics", 
            error: err.message 
        });
    }
});

/* Get monthly transaction statistics */
router.get("/monthly-transactions", async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();
        
        const monthlyStats = await BookTransaction.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(year, 0, 1),
                        $lt: new Date(year + 1, 0, 1)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        type: "$transactionType"
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ]);

        // Format data for frontend
        const formattedStats = {};
        monthlyStats.forEach(stat => {
            const month = stat._id.month;
            if (!formattedStats[month]) {
                formattedStats[month] = {
                    month: month,
                    monthName: new Date(year, month - 1).toLocaleString('default', { month: 'long' }),
                    issued: 0,
                    returned: 0
                };
            }
            formattedStats[month][stat._id.type.toLowerCase()] = stat.count;
        });

        res.status(200).json({
            success: true,
            data: Object.values(formattedStats)
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching monthly transaction statistics", 
            error: err.message 
        });
    }
});

/* Get most active users */
router.get("/active-users", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const users = await User.find({})
            .populate("activeTransactions")
            .populate("prevTransactions");

        const activeUsers = users
            .map(user => ({
                _id: user._id,
                userFullName: user.userFullName,
                email: user.email,
                userType: user.userType,
                totalTransactions: user.activeTransactions.length + user.prevTransactions.length,
                activeTransactions: user.activeTransactions.length,
                completedTransactions: user.prevTransactions.length
            }))
            .sort((a, b) => b.totalTransactions - a.totalTransactions)
            .slice(0, limit);

        res.status(200).json({
            success: true,
            data: activeUsers
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching active users", 
            error: err.message 
        });
    }
});

/* Get overdue books */
router.get("/overdue-books", async (req, res) => {
    try {
        const overdueTransactions = await BookTransaction.find({
            transactionType: "Issued",
            toDate: { $lt: new Date() }
        }).populate("bookId").populate("borrowerId");

        const overdueBooks = overdueTransactions.map(transaction => ({
            transactionId: transaction._id,
            book: transaction.bookId,
            borrower: transaction.borrowerId,
            issueDate: transaction.fromDate,
            dueDate: transaction.toDate,
            daysOverdue: Math.ceil((new Date() - new Date(transaction.toDate)) / (1000 * 60 * 60 * 24))
        }));

        res.status(200).json({
            success: true,
            count: overdueBooks.length,
            data: overdueBooks
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching overdue books", 
            error: err.message 
        });
    }
});

/* Get user borrowing history */
router.get("/user-history/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const user = await User.findById(userId)
            .populate({
                path: "activeTransactions",
                populate: { path: "bookId" }
            })
            .populate({
                path: "prevTransactions", 
                populate: { path: "bookId" }
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const history = {
            user: {
                _id: user._id,
                userFullName: user.userFullName,
                email: user.email,
                userType: user.userType
            },
            activeTransactions: user.activeTransactions,
            previousTransactions: user.prevTransactions,
            totalBooksIssued: user.activeTransactions.length + user.prevTransactions.length
        };

        res.status(200).json({
            success: true,
            data: history
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching user history", 
            error: err.message 
        });
    }
});

export default router;