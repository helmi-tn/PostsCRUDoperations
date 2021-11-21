import PostMessage from "../models/postMessage.js";
// import mongoose from 'mongoose'
// import { storage } from "../routes/posts.js";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages)

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// export const createPost = async (req, res) => {
//     const { username, description, likes, createdAt, tags } = req.body;
//     const { selectedFile } = req.file.originalname
//     const newPost = new PostMessage({
//         username,
//         description,
//         selectedFile,
//         likes,
//         createdAt,
//         tags
//     });

//     try {
//         await newPost.save();
//         res.status(201).json(newPost);

//     } catch (error) {

//         res.status(409).json({ message: error.message })

//     }
// }

export const deletePost = async (req, res) => {
    const { id } = req.params;
    await PostMessage.findByIdAndRemove(id)
    res.json({ message: 'Post deleted successfully' })
}

// export const updatePost = async (req, res) => {
//     const { id } = req.params
//     const post = req.body
//     const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })
//     res.json(updatedPost)
// }

export const likePost = async (req, res) => {
    const { id } = req.params
    const post = await PostMessage.findById(id)
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likes: post.likes + 1 }, { new: true });
    res.json(updatedPost);


}