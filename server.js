const nodemailer = require("nodemailer")

function nodeMail(email) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'hai.warungku@gmail.com',
            pass: "yricxuevjzvsyxxm"
        }
    })

    //step2
    let mailOptions = {
        from: "hai.warungku@gmail.com",
        to: email,
        subject: 'Confirmation email Success',
        text: "Selamat datang di dunia tipu-tipu!!"
    }

    //step3
    transporter.sendMail(mailOptions)
        .then(data => console.log("email sent!"))
        .catch(err => console.log("error!"))
}

module.exports = nodeMail