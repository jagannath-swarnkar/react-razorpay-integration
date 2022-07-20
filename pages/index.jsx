import Head from "next/head";
import { loadScript } from "../utils/global";

const Home = () => {
    const showRazorpay = async () => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay sdk failed to load. Are you online?");
        }
        const orderRes = await fetch("/api/razorpay")
        const order = await orderRes.json()
        const options = {
            key: process.env.RAZORPAY_KEY,
            amount: "50000",
            currency: "INR",
            name: "jagan.pro",
            description: "Offer me a coffee",
            image: "https://www.jagan.pro/icon/apple-touch-icon.png",
            order_id: order.id,
            handler: function (response) {
              console.log('response', response)
              alert("Payment successful")
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
            },
            prefill: {
                name: "Jagan Swarnkar",
                email: "jaganswornkar1998@gmail.com",
                contact: "7836848649",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };
    return (
        <div className={"body-container"}>
            <Head>
                <title>Razorpay integration in next js</title>
                <meta name="description" content="Razorpay integration in next js" />
                <link rel="icon" href="https://www.jagan.pro/favicon.ico" />
            </Head>

            <main>
                <button onClick={showRazorpay} className="btn btn-danger">
                    Donate ₹500
                </button>
            </main>
        </div>
    );
};
export default Home;
