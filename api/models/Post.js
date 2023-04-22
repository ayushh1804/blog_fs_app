const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: String,
    summary: String,
    Content: String,
    cover: String
}, {
    timestamps: true,
}
)

const PostModel = mongoose.model('Post',PostSchema);

module.exports = PostModel