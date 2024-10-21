const Post = require('../models/Post')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploadPost/')
  },
  filename: (req, file, cb) => {
    __filename = 'test'
    cb(null, Date.now() + file.originalname)
  }
})

// Initialize multer
upload = multer({ storage: storage })

const GetPost = async (req, res) => {
  try {
    const post = await Post.find({}).populate('activities').populate('comments')
    res.send(post)
  } catch (error) {
    throw error
  }
}

const CreatePost = async (req, res) => {
  try {
    const {
      title,
      review,
      cost,

      rate,
      weather,
      temperature,
      date,
      country,
      environment,
      like
    } = req.body


    const photos = req.file ? req.file.filename : null
    
    console.log(req.file);
    
    const post = await Post.create({
      title,
      review,
      cost,
      rate,

      weather,
      temperature,
      date,
      country,
      environment,
      like,
      photos
    })
    res.send(post)

  } catch (error) {
    console.error("Error creating post:", error); // Log error details
    res.status(500).send({ error: error.message }); // Send error response
  }
}


const UpdatePost = async (req, res) => {
  try {
    const postId = req.params.post_id
    const updates = req.body
    if (req.files) {
      updates.photos = req.files.map((file) => file.filename)
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true,
      runValidators: true
    })

    if (!updatedPost) {
      return res.send({ msg: 'Post not found' })
    }

    res.send(updatedPost)
  } catch (error) {
    res.send({ error: error.message })
  }
}

const DeletePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.post_id })
    res.send({
      msg: 'Post Deleted',
      payload: req.params.post_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

const PostDetail = async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.post_id })
      .populate('activities')
      .populate('comments')
    res.send(post)
  } catch (error) {
    throw error
  }
}

const LikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId; 

  console.log("User ID for liking the post:", userId)

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ message: 'Post not found' });
    }

    const userIndex = post.likedBy.indexOf(userId);

    if (userIndex === -1) {
      post.likedBy.push(userId);
      post.like += 1;
    } else {
      post.likedBy.splice(userIndex, 1);
      post.like -= 1;
    }

    const updatedPost = await post.save();

    res.send(updatedPost);
  } catch (error) {
    console.error('Error updating like count:', error);
    res.status(500).send({ error: error.message });
  }
};







module.exports = {
  GetPost,
  CreatePost,
  UpdatePost,
  DeletePost,
  PostDetail,
  LikePost,
}
