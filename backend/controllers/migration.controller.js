const { Resend } = require("resend");

// Basic in-memory guards — fine for a single Railway instance, resets on deploy.
const seenByIp = new Map();      // ip -> [timestamps]
const seenByEmail = new Map();   // lowercased email -> last request timestamp
const WINDOW_MS = 60 * 60 * 1000;      // 1 hour
const IP_LIMIT = 3;
const DEDUPE_MS = 24 * 60 * 60 * 1000; // 24 hours — don't re-notify support for the same person twice in a day

function isIpThrottled(ip) {
  const now = Date.now();
  const hits = (seenByIp.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  seenByIp.set(ip, hits);
  return hits.length > IP_LIMIT;
}

function isDuplicate(email) {
  const now = Date.now();
  const key = email.toLowerCase();
  const last = seenByEmail.get(key);
  if (last && now - last < DEDUPE_MS) return true;
  seenByEmail.set(key, now);
  return false;
}

function plusTwelveMonths(from) {
  const d = new Date(from);
  d.setMonth(d.getMonth() + 12);
  return d;
}

function fmt(d) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

// POST /api/ukg-migration
// Called from activate.html on ukg-hr.com when an existing customer asks to move to MadyHR.ai.
// Emails support@madyhr.ai with the request; never reveals that address to the customer.
module.exports.RequestMigration = async (req, res) => {
  try {
    const { company, first, last, email, honeypot } = req.body || {};

    // Bots fill hidden fields — pretend success, don't email support.
    if (honeypot) {
      return res.status(202).json({ success: true });
    }

    if (
      !company || company.trim().length < 2 ||
      !first || first.trim().length < 1 ||
      !last || last.trim().length < 1 ||
      !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
    ) {
      return res.status(400).json({ error: "Please fill in all fields with a valid email." });
    }

    const ip = ((req.headers["x-forwarded-for"] || req.ip || "unknown") + "").split(",")[0].trim();

    if (isIpThrottled(ip)) {
      return res.status(429).json({ error: "Too many requests, please try again later." });
    }

    // Same email requesting again inside 24h — already notified support once, don't spam.
    if (isDuplicate(email.trim())) {
      return res.status(202).json({ success: true });
    }

    const requested = new Date();
    const expires = plusTwelveMonths(requested);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: `MadyHR Migration <${process.env.SUPPORT_EMAIL}>`,
      to: "support@madyhr.ai",
      reply_to: email.trim(),
      subject: `UKG-HR transfer request — ${company.trim()}`,
      html: `
        <h2>New account transfer request from ukg-hr.com</h2>
        <p><b>Company:</b> ${company.trim()}</p>
        <p><b>Name:</b> ${first.trim()} ${last.trim()}</p>
        <p><b>Registered email:</b> ${email.trim()}</p>
        <p><b>Requested:</b> ${fmt(requested)}</p>
        <p><b>Account expires:</b> ${fmt(expires)} (12 months from request)</p>
        <p><b>Source IP:</b> ${ip}</p>
        <p>ACTION: create the organisation and admin user on MadyHR.ai, then email the temporary password to ${email.trim()} within 24 hours.</p>
      `,
      text: `New account transfer request from ukg-hr.com

Company: ${company.trim()}
Name: ${first.trim()} ${last.trim()}
Registered email: ${email.trim()}

Requested: ${fmt(requested)}
Account expires: ${fmt(expires)} (12 months from request)
Source IP: ${ip}

ACTION: create the organisation and admin user on MadyHR.ai, then email the temporary password to ${email.trim()} within 24 hours.`,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }

    return res.status(202).json({ success: true });
  } catch (error) {
    console.error("Error sending migration request email:", error.message);
    return res.status(502).json({ error: "Could not send request" });
  }
};
