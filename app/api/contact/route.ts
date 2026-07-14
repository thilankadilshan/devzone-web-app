import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Create Nodemailer transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.MAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Email to Thilanka (notification)
    const adminMailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || "Portfolio Contact"}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: "thilanka.cv@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; background: #050507; color: #fafafa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #0f0f13; border-radius: 16px; overflow: hidden; border: 1px solid rgba(229, 9, 20, 0.2); }
            .header { background: linear-gradient(135deg, #e50914, #b30710); padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
            .header p { margin: 8px 0 0; opacity: 0.9; font-size: 14px; }
            .content { padding: 30px; }
            .field { margin-bottom: 24px; }
            .field-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8a8a93; margin-bottom: 8px; display: block; }
            .field-value { font-size: 16px; color: #fafafa; line-height: 1.6; }
            .field-value.name { font-size: 20px; font-weight: 600; color: #e50914; }
            .message-box { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 20px; border-left: 3px solid #e50914; }
            .footer { padding: 20px 30px; background: rgba(0,0,0,0.3); text-align: center; font-size: 12px; color: #8a8a93; }
            .badge { display: inline-block; background: rgba(229, 9, 20, 0.2); color: #e50914; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Message Incoming</h1>
              <p>Someone visited your portfolio and wants to connect!</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="field-label">From</span>
                <div class="field-value name">${name}</div>
              </div>
              <div class="field">
                <span class="field-label">Email</span>
                <div class="field-value">${email}</div>
              </div>
              <div class="field">
                <span class="field-label">Subject</span>
                <div class="field-value">${subject}</div>
              </div>
              <div class="field">
                <span class="field-label">Message</span>
                <div class="message-box">
                  <div class="field-value">${message.replace(/\n/g, "<br>")}</div>
                </div>
              </div>
              <div style="margin-top: 30px; text-align: center;">
                <span class="badge">Portfolio Contact Form</span>
              </div>
            </div>
            <div class="footer">
              <p>Received on ${new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })} (Sri Lanka Time)</p>
              <p>thilankadilshan.dev | Sharper Labs | Dilshan DevZone</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `New Contact Form Submission\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\n---\nReceived from your portfolio contact form`,
    };

    // Auto-reply email to the user
    const userMailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || "Thilanka Dilshan"}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: "🚀 Message Received! I Will Get Back to You Soon",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Reaching Out</title>
          <style>
            body { font-family: 'Inter', -apple-system, sans-serif; background: #050507; color: #fafafa; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #0f0f13; border-radius: 16px; overflow: hidden; border: 1px solid rgba(229, 9, 20, 0.2); }
            .header { background: linear-gradient(135deg, #e50914, #b30710); padding: 50px 30px; text-align: center; position: relative; overflow: hidden; }
            .header::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: pulse 3s ease-in-out infinite; }
            @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.8; } }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; position: relative; z-index: 1; }
            .header p { margin: 12px 0 0; opacity: 0.9; font-size: 15px; position: relative; z-index: 1; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .greeting strong { color: #e50914; }
            .message { font-size: 15px; line-height: 1.8; color: #8a8a93; margin-bottom: 30px; }
            .message strong { color: #fafafa; }
            .details-box { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid rgba(255,255,255,0.05); }
            .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { color: #8a8a93; font-size: 13px; }
            .detail-value { color: #fafafa; font-size: 14px; font-weight: 500; }
            .cta-section { text-align: center; margin: 30px 0; }
            .cta-button { display: inline-block; background: linear-gradient(135deg, #e50914, #b30710); color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; margin: 8px; }
            .social-links { text-align: center; margin-top: 30px; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); }
            .social-links p { color: #8a8a93; font-size: 13px; margin-bottom: 16px; }
            .social-icon { display: inline-block; margin: 0 10px; color: #8a8a93; text-decoration: none; font-size: 13px; }
            .social-icon:hover { color: #e50914; }
            .footer { padding: 24px 30px; background: rgba(0,0,0,0.3); text-align: center; }
            .footer p { margin: 4px 0; font-size: 12px; color: #8a8a93; }
            .footer .name { color: #e50914; font-weight: 600; }
            .rocket { font-size: 40px; display: block; margin-bottom: 16px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="rocket">🚀</span>
              <h1>Message Launched Successfully!</h1>
              <p>Your message has rocketed through cyberspace and landed in my inbox.</p>
            </div>
            <div class="content">
              <p class="greeting">Hi <strong>${name}</strong>,</p>
              <p class="message">
                Thank you for reaching out through my portfolio! I have received your message about <strong>"${subject}"</strong> and I am excited to read what you have to say.
              </p>
              <p class="message">
                I typically respond within <strong>24 hours</strong> (often much faster). While you wait, feel free to check out my latest projects or catch up on my YouTube channel — <strong>Dilshan DevZone</strong>.
              </p>

              <div class="details-box">
                <div class="detail-row">
                  <span class="detail-label">Your Name</span>
                  <span class="detail-value">${name}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Subject</span>
                  <span class="detail-value">${subject}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Submitted On</span>
                  <span class="detail-value">${new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" })}</span>
                </div>
              </div>

              <div class="cta-section">
                <a href="https://youtube.com/@dilshandevzone" class="cta-button">Watch Dilshan DevZone</a>
                <a href="https://github.com/thilankadilshan" class="cta-button" style="background: transparent; border: 1px solid #e50914; color: #e50914;">View My GitHub</a>
              </div>

              <div class="social-links">
                <p>Connect with me on social media</p>
                <a href="https://github.com/thilankadilshan" class="social-icon">GitHub</a>
                <a href="https://linkedin.com/in/thilankadilshan" class="social-icon">LinkedIn</a>
                <a href="https://twitter.com/thilankadilshan" class="social-icon">X/Twitter</a>
                <a href="https://wa.me/qr/QDCAX4SBRGD5F1" class="social-icon">WhatsApp</a>
              </div>
            </div>
            <div class="footer">
              <p>This is an auto-generated message from <span class="name">thilankadilshan.dev</span></p>
              <p>Software Engineer @ Sharper Labs | Sri Lanka</p>
              <p style="margin-top: 8px; font-size: 11px; opacity: 0.6;">If you did not submit this form, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hi ${name},\n\nThank you for reaching out through my portfolio! I have received your message about "${subject}".\n\nI typically respond within 24 hours. While you wait, check out my YouTube channel - Dilshan DevZone.\n\nBest regards,\nThilanka Dilshan\nSoftware Engineer @ Sharper Labs\nhttps://thilankadilshan.dev`,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json(
      { ok: true, status: "Message launched successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to send message. Please try again or use WhatsApp.",
      },
      { status: 500 },
    );
  }
}
