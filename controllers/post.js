const { StatusCodes } = require('http-status-codes')
const Post = require('../models/Post')
const { NotFoundError } = require('../errors/index')

const getAllPosts = async(req, res) => { 
    const posts = await Post.find({}).sort('-createdAt')
    res.status(StatusCodes.OK).json( posts )        
}
const getPost = async(req, res) => {
    const post = await Post.findOne({ _id : req.params.id })
    if(!post) {
        throw new NotFoundError('Post cannot found')
    }
    res.status(StatusCodes.OK).json({ post })
}
const createPost = async(req, res) => {
   
    const post = await Post.create(req.body)
    res.status(StatusCodes.CREATED).json({ post })
}
const deletePost = async(req, res) => {
    const post = await Post.findByIdAndRemove({ _id : req.params.id, author : req.user })
    if(!post){
        throw new NotFoundError(`No post with id ${req.param.id}`)
    }
    res.status(StatusCodes.OK).send('')
}
const updatePost = async(req, res) => {
    const post = await Post.findByIdAndUpdate({ 
        _id : req.params.id, author : req.user}, 
        req.body,
        { new : true, runValidators:true } 
        )
    if(!post) {
        throw new NotFoundError(`No post with id ${req.param.id}`)
    }
    res.status(StatusCodes.OK).json({ post })
}
const getAllUsersPosts = async(req, res) => {   
    const post = await Post.find({ authorId : req.params.userId }).sort('-createdAt')
    res.status(StatusCodes.OK).json({ post })
}
const getTinyApi = async(req, res) => {
    const api = process.env.REACT_KEY
    res.status(StatusCodes.OK).json({api})
}
module.exports = { getAllPosts, getPost, createPost, deletePost, updatePost, getAllUsersPosts, getTinyApi }