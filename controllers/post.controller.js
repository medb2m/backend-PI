import Post from '../models/post.model.js'

// Create a new post
export const createPost = async (req, res) => {
  const post = new Post(req.body)
  await post.save()
  res.status(201).json(post)
}

// Get all posts
export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('title').populate('content')
  res.json(posts)
}

// Get a single post by id
export const getPostById = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('title').populate('content')
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.json(post);
}

// Update a post by id
export const updatePostById = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.json(post)
}

// Delete a category by id
export const deletePostById = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }
  res.json({ message: 'Post deleted' })
}