import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth))

exports.sendMail = (to, subject, body) => {
  console.log('Sending mail to:' + to)
  nodemailerMailgun.sendMail({
    from: 'postmaster@sandbox65b7fabb93b447c1820a17e912ecfe3a.mailgun.org',
    to: to,
    subject: subject,
    html: body
  }, function (err, info) {
    if (err) {
      console.log('Error: ' + err)
    } else {
      console.log('Response: ' + info)
    }
  })
}
