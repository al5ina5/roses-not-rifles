import axios from "axios";

module.exports = async (req, res) => {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.WOOCOMMERCE_SECRET_KEY}`;
        console.log(url);
        const orderReq = await axios.get(url);

        res.json(orderReq.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            body: "Errror.",
            query: req.query,
            cookies: req.cookies,
        });
    }
};
