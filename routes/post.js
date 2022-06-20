const express = require('express')
const router = express.Router()

const { getAllPosts, getPost, createPost, deletePost, updatePost, getAllUsersPosts, getTinyApi } = require('../controllers/post') 
const { createComment, deleteComment, getAllComments } = require('../controllers/comment')

router.route('/').get(getAllPosts).post(createPost)
router.route('/get').get(getTinyApi)
router.route('/user/:userId').get(getAllUsersPosts)
router.route('/:id').get(getPost).delete(deletePost).patch(updatePost)
router.route('/:id/:postID').post(createComment).get(getAllComments)
router.route('/:id/:postID/:commentID').delete(deleteComment)


module.exports = router