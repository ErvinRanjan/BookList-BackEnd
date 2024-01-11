import mongoose from 'mongoose'
const bookSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        author:{
            type: String,
            required: true
        },
        publishYear:{
            type: Number,
            required: true
        },
        imageUrl:{
            type: String,
            required: false,
            default: "NULL",
        },

    },
    {
        timestamps:true
    }
)
export const bookModel = mongoose.model('Book', bookSchema);