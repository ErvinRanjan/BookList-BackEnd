import express from "express"
import { bookModel } from "../models/bookModel.js"
import { getImageUrl } from "../scraper.js"

const router = express.Router()
// working with moogoose is a asynchcronous process
router.post("/",async (req,res)=>{
try {
    if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({message: "fill in all the required fields"})
    }
    const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
    }
    const book = await bookModel.create(newBook);
    return res.status(201).send(book);
} catch (error) {
    console.log(error.message)
    res.status(500).send({message:error.message})
}
})
router.get("/",async (req,res)=>{
try {
    const books = await bookModel.find({})
    return res.status(200).json({
        count: books.length,
        data: books
    })
} catch (error) {
    console.log(error.message)
    res.status(500).send({message:error.message})
}
})
router.get("/:id",async (req,res)=>{
try {
    const {id} = req.params
    const book = await bookModel.findById(id)
    if(!book){
        return res.status(404).json({message:"Book Not Found"})
    }
    try{
    book.imageUrl = await getImageUrl(`https://openlibrary.org/search?q=${book.title.trim().split().join('+')}&mode=everything`)
    return res.status(200).json(book)
    }
    catch(err){
        console.log(err.message)
        return res.status(200).json(book)
    }
} catch (error) {
    console.log(error.message)
    res.status(500).send({message:error.message})
}
})

router.put("/:id",async (req,res)=>{
try {
    if(!req.body.title || !req.body.author || !req.body.publishYear){
        return res.status(400).send({message: "fill in all the required fields"})
    }
    const {id} = req.params
    const updateBook = await bookModel.findByIdAndUpdate(id,req.body)
    if(!updateBook){
        return res.status(404).json({message:"book not found"})
    }
    return res.status(200).json({message:"book updated"})

} catch (error) {
    console.log(error.message)
    res.status(500).send({message:error.message})
}
})

router.delete("/:id",async (req,res)=>{
try {
    const {id} = req.params
    const result = await bookModel.findByIdAndDelete(id)
    if(!result){
       return res.status(404).json({message:"Book Not Found"})
    }
    return res.status(200).json({message: "Book deleted successfully"})

} catch (error) {
    console.log(error.message)
    res.status(500).send(error.message)
}
})

export default router;