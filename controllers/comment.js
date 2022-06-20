const { StatusCodes } = require('http-status-codes')
const Comment = require('../models/Comment')

const getAllComments = async(req, res) => {
    const comments = await Comment.find({ createdPost : req.params.postID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ comments })
}
const createComment = async(req, res) => {
    req.body.createdPost = req.params.postID
    const comment = await Comment.create({ ...req.body })
    
    res.status(StatusCodes.CREATED).json({ comment })   
}

const deleteComment = async(req, res) => {
    const comment = await Comment.findOneAndRemove({ _id : req.params.commentID })
    if(!comment){
        throw new NotFoundError(`No post with id ${req.param.id}`)
    }
    res.status(StatusCodes.OK).json({ comment })
}

module.exports = { createComment, deleteComment, getAllComments }