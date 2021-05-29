import mongoose from "mongoose";
var Schema = mongoose.Schema;

var message = new Schema({
    author: {
        name: String,
        id: String,
    },
    content: String,
    date: { type: Date, default: Date.now },
});

mongoose.models = {};

var Message = mongoose.model("Message", message);

export default Message;
