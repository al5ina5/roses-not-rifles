import axios from "axios";

// const { data: variations, error } = useSWR(
//     `https://api.sebastianalsina.com/i/wp-json/wc/v3/products/${id}/variations/?consumer_key=ck_c3873703ef255eb3d803a6a61113c592ce752c0f&consumer_secret=cs_be6dd9734d54e9885fe006840f4a96266a38634e`
// )
module.exports = async (req, res) => {
    const { id } = req.query;
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/products/${id}/variations?consumer_key=${process.env.WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.WOOCOMMERCE_SECRET_KEY}`;
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
