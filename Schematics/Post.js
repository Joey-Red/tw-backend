mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    postBody: { type: String, required: true },
    postUser: { type: String, required: true },
    dateAdded: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);

// {
//   "title": "The Invitation",
//   "year": "2022",
//   "genre": "Horrer, Thriller",
//   "imdbRating": "5.4",
//   "votes": "10,413",
//   "imdbId": "tt12873562",
//   "BoxOffice": "$24,530,174"
// },

// {
//     title: "Step Brothers", "year": "2008", "genre": "Comedy", "imdbRating": "6.9",
//     "votes": "294,744", "imdbId": "tt0838283", "BoxOffice": "$100,468,793"
// }
