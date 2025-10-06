import express from "express";
import Book from "../models/Book.js";
import User from "../models/User.js";
import BookTransaction from "../models/BookTransaction.js";
import BookCategory from "../models/BookCategory.js";

const router = express.Router();

/* Search books by multiple criteria */
router.get("/search", async (req, res) => {
    try {
        const { query, author, category, language, status } = req.query;
        
        let searchCriteria = {};
        
        // Text search in book name and alternate title
        if (query) {
            searchCriteria.$or = [
                { bookName: { $regex: query, $options: 'i' } },
                { alternateTitle: { $regex: query, $options: 'i' } }
            ];
        }
        
        // Filter by author
        if (author) {
            searchCriteria.author = { $regex: author, $options: 'i' };
        }
        
        // Filter by language
        if (language) {
            searchCriteria.language = { $regex: language, $options: 'i' };
        }
        
        // Filter by status
        if (status) {
            searchCriteria.bookStatus = status;
        }
        
        let books = await Book.find(searchCriteria).populate("categories").populate("transactions");
        
        // Filter by category if specified
        if (category) {
            books = books.filter(book => 
                book.categories.some(cat => 
                    cat.categoryName.toLowerCase().includes(category.toLowerCase())
                )
            );
        }
        
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error searching books", 
            error: err.message 
        });
    }
});

/* Get books with pagination */
router.get("/paginated", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const books = await Book.find({})
            .populate("categories")
            .populate("transactions")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Book.countDocuments();
        
        res.status(200).json({
            success: true,
            data: books,
            pagination: {
                current: page,
                total: Math.ceil(total / limit),
                totalBooks: total,
                hasNext: skip + limit < total,
                hasPrev: page > 1
            }
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching paginated books", 
            error: err.message 
        });
    }
});

/* Get available books only */
router.get("/available", async (req, res) => {
    try {
        const books = await Book.find({ 
            bookStatus: "Available",
            bookCountAvailable: { $gt: 0 }
        }).populate("categories");
        
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching available books", 
            error: err.message 
        });
    }
});

/* Get popular books (most borrowed) */
router.get("/popular", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        const books = await Book.find({})
            .populate("transactions")
            .populate("categories");
            
        // Sort by number of transactions (popularity)
        const popularBooks = books
            .sort((a, b) => b.transactions.length - a.transactions.length)
            .slice(0, limit);
            
        res.status(200).json({
            success: true,
            data: popularBooks.map(book => ({
                ...book.toObject(),
                borrowCount: book.transactions.length
            }))
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching popular books", 
            error: err.message 
        });
    }
});

/* Get recently added books */
router.get("/recent", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const days = parseInt(req.query.days) || 30;
        
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - days);
        
        const books = await Book.find({
            createdAt: { $gte: dateThreshold }
        })
        .populate("categories")
        .sort({ createdAt: -1 })
        .limit(limit);
        
        res.status(200).json({
            success: true,
            count: books.length,
            data: books
        });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching recent books", 
            error: err.message 
        });
    }
});

export default router;