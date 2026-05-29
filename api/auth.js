module.exports = function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { password } = req.body || {};
  const admin = process.env.ADMIN_PASSWORD;
  if (admin && password === admin) return res.status(200).json({ ok: true });
  res.status(401).json({ error: 'Incorrect password' });
};
