const mongoose = require("mongoose");
import Message from "../../../api/models/Message";

mongoose.connect(
    "mongodb+srv://alsinas:gdwtH9hMlTldAcCM@cluster0.ljbwi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = async (req, res) => {
    try {
        const results = await Message.find({});
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({
            body: "Error.",
            query: req.query,
            cookies: req.cookies,
        });
    }
};
