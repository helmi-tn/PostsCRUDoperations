import mongoose from 'mongoose'

const postShcema = mongoose.Schema({
    username: String,
    selectedFile: String,
    description: String,
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    tags: [String]

})

const PostMessage = mongoose.model('PostMessage', postShcema);

export default PostMessage;