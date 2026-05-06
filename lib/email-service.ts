// lib/email-service.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ============================================
// HELPER FUNCTIONS
// ============================================

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\n/g, '<br>');
}

// ============================================
// PRICING SECTION EMAIL TEMPLATE
// ============================================

function generatePricingEmailHTML(data: {
  name: string;
  email: string;
  plan: string;
  phone?: string;
  companyName?: string;
  message?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Pricing Plan Signup</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .plan-badge {
      background: #ffd700;
      color: #333;
      padding: 5px 15px;
      border-radius: 20px;
      display: inline-block;
      font-weight: bold;
      margin-top: 10px;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
      border: 1px solid #e5e5e5;
      border-top: none;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
      color: #555;
      margin-bottom: 5px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .value {
      background: white;
      padding: 12px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      word-break: break-word;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
    .timestamp {
      color: #999;
      font-size: 11px;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🚀 New Pricing Plan Signup</h2>
      <div class="plan-badge">${escapeHtml(data.plan)}</div>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(data.name) || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">
          <a href="mailto:${escapeHtml(data.email)}" style="color: #667eea;">${escapeHtml(data.email)}</a>
        </div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${escapeHtml(data.phone)}</div>
      </div>
      ` : ''}
      ${data.companyName ? `
      <div class="field">
        <div class="label">Company Name</div>
        <div class="value">${escapeHtml(data.companyName)}</div>
      </div>
      ` : ''}
      ${data.message ? `
      <div class="field">
        <div class="label">Additional Message</div>
        <div class="value">${escapeHtml(data.message)}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>This lead came from the pricing section of your website.</p>
      <p>Reply directly to ${escapeHtml(data.email)} to respond to this inquiry.</p>
    </div>
    <div class="timestamp">
      Submitted on: ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// CONTACT SECTION EMAIL TEMPLATE
// ============================================

function generateContactEmailHTML(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Message</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
      border: 1px solid #e5e5e5;
      border-top: none;
    }
    .field {
      margin-bottom: 20px;
    }
    .label {
      font-weight: bold;
      color: #555;
      margin-bottom: 5px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .value {
      background: white;
      padding: 12px;
      border-radius: 5px;
      border: 1px solid #e0e0e0;
      word-break: break-word;
    }
    .message-box {
      background: white;
      padding: 15px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      white-space: pre-wrap;
      line-height: 1.5;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #888;
    }
    .timestamp {
      color: #999;
      font-size: 11px;
      text-align: center;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>💬 New Contact Form Message</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(data.name) || 'Not provided'}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">
          <a href="mailto:${escapeHtml(data.email)}" style="color: #3b82f6;">${escapeHtml(data.email)}</a>
        </div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${escapeHtml(data.subject) || 'No subject'}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
    </div>
    <div class="footer">
      <p>This message was sent from the contact form on your website.</p>
      <p>Reply directly to <strong>${escapeHtml(data.email)}</strong> to respond to this inquiry.</p>
    </div>
    <div class="timestamp">
      Submitted on: ${new Date().toLocaleString()}
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// SEND EMAIL FUNCTIONS
// ============================================

// Send email for Pricing section signups
export async function sendPricingEmail(data: {
  name: string;
  email: string;
  plan: string;
  phone?: string;
  companyName?: string;
  message?: string;
}) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Prochar Home <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || "rar@daffodil.group"],
      replyTo: data.email,
      subject: `🎯 New ${data.plan} Plan Signup - ${data.name || data.email}`,
      html: generatePricingEmailHTML(data),
    });

    if (error) {
      console.error("Resend pricing email error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Pricing email sent successfully:", result?.id);
    return { success: true, id: result?.id };
  } catch (error) {
    console.error("Pricing email error:", error);
    return { success: false, error: String(error) };
  }
}

// Send email for Contact section messages
export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    const { data: result, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Prochar Home <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || "rar@daffodil.group"],
      replyTo: data.email,
      subject: `📧 Contact Form: ${data.subject || 'New Message'} from ${data.name || data.email}`,
      html: generateContactEmailHTML(data),
    });

    if (error) {
      console.error("Resend contact email error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Contact email sent successfully:", result?.id);
    return { success: true, id: result?.id };
  } catch (error) {
    console.error("Contact email error:", error);
    return { success: false, error: String(error) };
  }
}