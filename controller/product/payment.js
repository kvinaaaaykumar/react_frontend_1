const productModel = require("../../models/productModel")
const Stripe = require('stripe');


// Stripe payment route
app.post('/api/payment', async (req, res) => {
    const { amount, token } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method: token.id,
            confirm: true,
        });

        res.status(200).json({
            success: true,
            paymentIntent,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = payment