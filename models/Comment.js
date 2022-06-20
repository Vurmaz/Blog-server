const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, ' Please provide name ']
    },
    comment:{
        type:String,
        required:[true, ' Please provide comment ']
    },
    createdPost:{
        type:mongoose.Types.ObjectId,
        ref: 'Post',
        required:[true, ' Please provide post ']
    }
}, { timestamps:true })

module.exports = mongoose.model('Comment', CommentSchema)