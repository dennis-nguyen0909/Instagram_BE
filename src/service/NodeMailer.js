
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const { generalAuth } = require("../helper");
dotenv.config();
const sendEmailGenerateAuth = async (email) => {
    const authRandom = generalAuth();
    console.log(authRandom)
    let transporter = nodemailer.createTransport({
        service: 'Gmail',//chọn service là Gmail nếu ko sẽ sai
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Cám ơn , quý khách đã mua hàng tại Sneaker Asia.", // Subject line
        text: "Hello world?", // plain text body
        html: `<div>
                <b>Mã xác thực của bạn là : </b>${authRandom}
            </div>`, // html body
    });
    return { authRandom }

}
module.exports = { sendEmailGenerateAuth }