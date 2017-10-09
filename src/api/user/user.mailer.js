import mailer from '../../utils/mailer'
import config from 'config'

exports.sendVerificationEmail = (user) => {
  mailer.sendMail(user.get('email'),
    'Verify your email',
    '<p>Hey ' + user.get('givenName') + ',</p><p>Click <a href=' + config.app.publicUrl + '/api/user/verify?code=' + user.get('verificationCode') + '>here</a> to verify your email.</p>')
}

exports.sendWelcomeEmail = (user) => {
  mailer.sendMail(user.get('email'),
    'Welcome to App',
    '<p>Hey ' + user.get('givenName') + ',</p><p>Welcome to App.</p>')
}
