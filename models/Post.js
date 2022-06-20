const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, ' Please provide a title ']

    },
    author: {
        type:String,
        ref:'User',
        required:[true, 'Please provide user']
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, ' Please provide user '],
    },
    content: {
        type:String,
        required:[true, ' Please provide content '],
        min:30,
        max:500,
    }

}, { timestamps:true })

module.exports = mongoose.model('Post', PostSchema)