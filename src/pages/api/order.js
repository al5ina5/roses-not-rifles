import axios from 'axios'
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount()

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    })

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: to.join(', '), // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    })

    console.log('Message sent: %s', info.messageId)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = async (req, res) => {
    const { order } = req.body
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/wp-json/wc/v3/orders/?consumer_key=${process.env.WOOCOMMERCE_CONSUMER_KEY}&consumer_secret=${process.env.WOOCOMMERCE_SECRET_KEY}`

        try {
            const orderReq = await axios.post(url, order)
            const orderData = orderReq.data

            // sendMail([orderData.billing.email]);

            res.json({
                order: orderData
            })
        } catch (error) {
            res.status(500).json({
                body: 'A server error occurred.'
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            body: 'A server error occurred.'
        })
    }
}
