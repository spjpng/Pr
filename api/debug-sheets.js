module.exports = function handler(req, res) {
  const url = process.env.SHEETS_URL || '';
  res.json({
    sheets_url_set: url.length > 0,
    sheets_url_preview: url ? url.slice(0, 40) + '...' : '(not set)',
  });
};
