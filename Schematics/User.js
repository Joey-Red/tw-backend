mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    movieList: { type: Array, required: true },
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);