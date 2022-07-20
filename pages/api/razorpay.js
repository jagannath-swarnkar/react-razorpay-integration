const Razorpay = require("razorpay");

const handler = async (req, res) => {
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    var options = {
        amount: 50000,
        currency: "INR",
        receipt: String(parseInt(Math.random() * 10 ** 10)),
    };
    const order = await instance.orders.create(options);
    res.status(200).json(order);
};
export default handler;
