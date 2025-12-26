import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        require:true
    },
    alternateTitle:{
        type:String,
        default:""
    },
    author:{
        type:String,
        require:true
    },
    language:{
        type:String,
        default:""
    },
    publisher:{
        type:String,
        default:""
    },
    bookCountAvailable:{
        type:Number,
        require:true
    },
    bookStatus:{
        type:String,
        default:"Available"
    },
    categories:[{ 
        type: mongoose.Types.ObjectId, 
        ref: "BookCategory" 
    }],
    transactions:[{
        type:mongoose.Types.ObjectId,
        ref:"BookTransaction"
    }]
},
{
    timestamps:true
})

export default mongoose.model("Book",BookSchema)
// Indexes to improve query performance on common filters
// Note: case-insensitive regex may not fully utilize indexes,
// but equality and range filters benefit significantly.
BookSchema.index({ author: 1 });
BookSchema.index({ language: 1 });
BookSchema.index({ bookStatus: 1, bookCountAvailable: 1 });
BookSchema.index({ createdAt: -1 });
BookSchema.index({ categories: 1 });