import express from 'express';
import { createPost, getAllPosts, getPostById, updatePostById, deletePostById } from '../controllers/post.controller.js';
import { createComment, getAllComments, getCommentById, updateCommentById, deleteCommentById } from '../controllers/postComment.controller.js';

const router = express.Router();

// add routes
router.post('/post',createPost)
router.post('/comment',createComment)

// get all routes
router.get('/post',getAllPosts)
router.get('/comment',getAllComments)

// getOne by ID
router.get('/post/:id',getPostById)
router.get('/comment/:id',getCommentById)

// update by ID
router.put('/post/:id', updatePostById)
router.put('/comment/:id',updateCommentById)

// deleteBy ID
router.delete('/post/:id',deletePostById)
router.delete('/comment/:id',deleteCommentById)


export default router;
