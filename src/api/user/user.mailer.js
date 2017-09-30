import mailer from '../../utils/mailer'

exports.sendVerificationEmail = (user) => {
  console.log('Send Verification Email')
}

exports.sendWelcomeEmail = (user) => {
  mailer.sendMail(user.get('email'),
    'Welcome to App',
    '<p>Hey ' + user.get('givenName') + ',</p><p>Welcome to App.</p>')
}
