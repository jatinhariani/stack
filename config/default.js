module.exports = {
  app: {
    publicUrl: process.env.PUBLIC_URL,
    port: process.env.PORT
  },
  auth: {
    ttl: 365 * 24 * 60 * 60
  },
  mailer: {
    mailgunApiKey: process.env.MAILGUN_API_KEY,
    mailgunServer: process.env.MAILGUN_DOMAIN
  },
  databaseUrl: process.env.DATABASE_URL
}
