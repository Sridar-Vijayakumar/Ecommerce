const nodemailer = require("nodemailer");
const NewsletterSubscriber = require("../models/NewsletterSubscriber");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const featuredOffers = [
  { name: "iPhone 16 Pro", price: "₹129,999", originalPrice: "₹139,999", saving: "7% OFF" },
  { name: "Studio Headphones", price: "₹12,499", originalPrice: "₹15,999", saving: "22% OFF" },
  { name: "Food Processor", price: "₹7,499", originalPrice: "", saving: "Featured" },
  { name: "Dual-Band Internet Router", price: "₹2,999", originalPrice: "", saving: "Featured" },
];

const subscribeToNewsletter = async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();

  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }

  let isNewSubscriber;

  try {
    const result = await NewsletterSubscriber.updateOne(
      { email },
      { $setOnInsert: { email } },
      { upsert: true }
    );
    isNewSubscriber = result.upsertedCount > 0;
  } catch (error) {
    console.error("Newsletter subscription failed:", error.message);
    return res.status(500).json({
      message: "Unable to save your subscription right now. Please try again.",
    });
  }

  if (!isNewSubscriber) {
    return res.json({ message: "You’re already subscribed to ShopEase offers." });
  }

  // The subscription is complete once it is saved. Email delivery is a
  // best-effort follow-up and should not turn a valid subscription into an error.
  res.status(201).json({
    message: "You’re subscribed! Use WELCOME10 for 10% off your first order.",
  });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) {
    console.warn("Newsletter email skipped: SMTP is not configured.");
    return;
  }

  try {
    const shopUrl = process.env.CLIENT_URL || "http://localhost:5173";
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s/g, "") },
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: "Your ShopEase offers are here — save 10% today",
      text: [
        "Welcome to ShopEase!",
        "",
        "FIRST ORDER: Use WELCOME10 for 10% off.",
        "WEEKEND SPECIAL: Use SAVE40 for up to 40% off selected products.",
        "",
        ...featuredOffers.map((offer) =>
          `${offer.name}: ${offer.price}${offer.originalPrice ? ` (MRP ${offer.originalPrice})` : ""} — ${offer.saving}`),
        "",
        `Shop now: ${shopUrl}/products?offers=true`,
        "Offer availability and product stock may change. Terms apply.",
      ].join("\n"),
      html: `
        <div style="background:#f8faf9;padding:24px 12px;font-family:Arial,sans-serif;color:#17211f">
          <div style="max-width:620px;margin:auto;overflow:hidden;border-radius:24px;background:#ffffff">
            <div style="padding:36px 32px;text-align:center;background:#0d9488;color:#ffffff">
              <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:3px">SHOPEASE OFFERS</p>
              <h1 style="margin:14px 0 8px;font-size:32px">Welcome to a better inbox.</h1>
              <p style="margin:0;color:#ccfbf1">Fresh finds and subscriber-only savings, delivered.</p>
            </div>
            <div style="padding:32px">
              <div style="padding:24px;border-radius:16px;background:#f0fdfa;text-align:center">
                <p style="margin:0 0 8px;color:#0f766e;font-weight:700">10% OFF YOUR FIRST ORDER</p>
                <strong style="font-size:30px;letter-spacing:3px">WELCOME10</strong>
                <p style="margin:8px 0 0;color:#64748b;font-size:13px">Enter this code at checkout.</p>
              </div>
              <div style="margin-top:18px;padding:20px;border-radius:16px;background:#17211f;color:#ffffff;text-align:center">
                <p style="margin:0 0 6px;color:#99f6e4;font-size:13px;font-weight:700">WEEKEND SPECIAL</p>
                <strong style="font-size:24px">Up to 40% off with SAVE40</strong>
              </div>
              <h2 style="margin:30px 0 14px;font-size:22px">Offers picked for you</h2>
              ${featuredOffers.map((offer) => `
                <div style="padding:16px 0;border-top:1px solid #e2e8f0">
                  <table role="presentation" style="width:100%;border-collapse:collapse">
                    <tr>
                      <td>
                        <strong>${offer.name}</strong>
                        <div style="margin-top:5px;color:#0f766e;font-size:13px;font-weight:700">${offer.saving}</div>
                      </td>
                      <td style="text-align:right">
                        <strong style="font-size:18px">${offer.price}</strong>
                        ${offer.originalPrice ? `<div style="color:#94a3b8;font-size:12px;text-decoration:line-through">${offer.originalPrice}</div>` : ""}
                      </td>
                    </tr>
                  </table>
                </div>
              `).join("")}
              <div style="margin-top:28px;text-align:center">
                <a href="${shopUrl}/products?offers=true" style="display:inline-block;padding:14px 26px;border-radius:12px;background:#0d9488;color:#ffffff;font-weight:700;text-decoration:none">Shop all offers</a>
              </div>
              <p style="margin:28px 0 0;color:#94a3b8;font-size:12px;line-height:1.6;text-align:center">
                Offers are subject to availability and may change. You received this email
                because you subscribed on ShopEase.
              </p>
            </div>
          </div>
        </div>
      `,
    });

  } catch (error) {
    console.error("Newsletter email failed:", error.message);
  }
};

module.exports = { subscribeToNewsletter };
