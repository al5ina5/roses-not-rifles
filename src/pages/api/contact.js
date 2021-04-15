import axios from "axios";

module.exports = async (req, res) => {
    const { text } = req.body;
    try {
        const url = `https://hooks.slack.com/services/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`;
        const slackPost = await axios.post(url, { text });

        res.json({
            order: slackPost.data,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error.",
        });
    }
};
