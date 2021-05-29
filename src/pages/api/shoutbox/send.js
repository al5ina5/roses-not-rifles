const mongoose = require("mongoose");
const Pusher = require("pusher");
import Message from "../../../api/models/Message";

const pusher = new Pusher({
    appId: "1181389",
    key: "b6f336423875ed9dee89",
    secret: "84bd0d808084e377fe46",
    cluster: "us2",
    useTLS: true,
});

mongoose.connect(
    "mongodb+srv://alsinas:gdwtH9hMlTldAcCM@cluster0.ljbwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = async (req, res) => {
    const { content, author } = req.body;

    try {
        const message = new Message({
            content: content.slice(0, 240),
            author,
        });
        await message.save();

        pusher.trigger("shoutbox", "new-message", message);

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({
            body: "Error",
            query: req.query,
            cookies: req.cookies,
        });
    }
};
