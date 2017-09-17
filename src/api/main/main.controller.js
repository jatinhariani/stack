exports.index = (req, res) => {
  res.json({
    uptime: process.uptime()
  })
}
