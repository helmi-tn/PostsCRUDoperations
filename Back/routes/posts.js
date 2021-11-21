import express from 'express'
import { getPosts, deletePost, likePost } from '../controllers/posts.js';
import multer from 'multer';
import PostMessage from '../models/postMessage.js';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "C:/Users/TakiAcademy/Desktop/Mini-projet/takithemes/public/uploads");
    },

    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

const uploads = multer({ storage: storage })


const router = express.Router();

router.get('/', getPosts);
router.post('/', uploads.single('selectedFile'), async (req, res) => {
    const { username, description, likes, createdAt, tags } = req.body;
    const selectedFile = req.file
    const newPost = new PostMessage({
        username,
        description,
        selectedFile: selectedFile.originalname,
        likes,
        createdAt,
        tags
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {

        res.status(409).json({ message: error.message })

    }
})

router.delete('/delete/:id', deletePost);

router.put('/put/:id', uploads.single("selectedFile"), async (req, res) => {
    const { id } = req.params
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {
        username: req.body.username,
        description: req.body.description,
        selectedFile: req.file.originalname,
        tags: req.body.tags
    }, { new: true })
    res.json(updatedPost)
})

router.put('/likePost/:id', likePost);

export default router