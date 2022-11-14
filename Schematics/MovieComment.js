mongoose = require("mongoose");

const MovieCommentSchema = new mongoose.Schema({
    postUser: { type: String, required: true },
    postUserId: { type: String, required: true },
    movieName: { type: String, required: true },
    seen: { type: Boolean, required: true },
    planSee: { type: Boolean, required: true },
    comment: { type: String, required: false, default: "No comment" },
    userRating: { type: Number, required: true, default: 0 },
    moviePoster: { type: String, required: true },
    dateAdded: { type: String, required: true },
});

module.exports = mongoose.model("MovieComment", MovieCommentSchema);
