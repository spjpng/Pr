module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const url = process.env.SHEETS_URL;
  if (!url) return res.status(200).json({ ok: true });
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(req.body),
    });
  } catch (e) {}
  res.status(200).json({ ok: true });
};
