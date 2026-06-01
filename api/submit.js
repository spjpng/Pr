module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const url = process.env.SHEETS_URL;
  if (!url) return res.status(200).json({ ok: true });
  try {
    // Google Apps Script redirects POST with 302; follow manually to preserve method
    const init = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(req.body),
    };
    let response = await fetch(url, { ...init, redirect: 'manual' });
    if (response.status === 301 || response.status === 302 || response.status === 307 || response.status === 308) {
      const location = response.headers.get('location');
      const allowed = location && (
        location.startsWith('https://script.google.com/') ||
        location.startsWith('https://script.googleusercontent.com/')
      );
      if (allowed) response = await fetch(location, { ...init, redirect: 'follow' });
    }
    if (!response.ok) {
      console.error('[submit] Sheets responded', response.status);
    }
  } catch (e) {
    console.error('[submit] fetch error:', e.message);
  }
  res.status(200).json({ ok: true });
};
