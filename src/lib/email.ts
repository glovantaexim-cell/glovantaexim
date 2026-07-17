import nodemailer from 'nodemailer';

interface ContactEmailData {
  fullName: string;
  companyName?: string | null;
  country: string;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  productInterest?: string | null;
  quantity?: string | null;
  message: string;
}

export async function sendContactEmail(data: ContactEmailData) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'glovantaexim@gmail.com',
      subject: `New Contact Form Submission from ${data.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #1e40af; display: block; margin-bottom: 5px; }
            .value { background: white; padding: 12px; border-radius: 5px; border-left: 3px solid #2563eb; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔔 New Inquiry Received</h1>
              <p style="margin: 10px 0 0 0;">Glovanta Exim Contact Form</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">👤 Full Name:</span>
                <div class="value">${data.fullName}</div>
              </div>
              
              ${data.companyName ? `
              <div class="field">
                <span class="label">🏢 Company Name:</span>
                <div class="value">${data.companyName}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <span class="label">🌍 Country:</span>
                <div class="value">${data.country}</div>
              </div>
              
              <div class="field">
                <span class="label">📧 Email:</span>
                <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
              </div>
              
              ${data.phone ? `
              <div class="field">
                <span class="label">📱 Phone:</span>
                <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
              </div>
              ` : ''}
              
              ${data.whatsapp ? `
              <div class="field">
                <span class="label">💬 WhatsApp:</span>
                <div class="value"><a href="https://wa.me/${data.whatsapp.replace(/[^\d+]/g, '')}">${data.whatsapp}</a></div>
              </div>
              ` : ''}
              
              ${data.productInterest ? `
              <div class="field">
                <span class="label">📦 Product Interest:</span>
                <div class="value">${data.productInterest}</div>
              </div>
              ` : ''}
              
              ${data.quantity ? `
              <div class="field">
                <span class="label">📊 Quantity:</span>
                <div class="value">${data.quantity}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <span class="label">💬 Message:</span>
                <div class="value">${data.message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from your Glovanta Exim website contact form.</p>
              <p>Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Auto-reply to customer
    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: 'Thank you for contacting Glovanta Exim',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .cta-button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Thank You!</h1>
              <p style="margin: 10px 0 0 0;">We've received your inquiry</p>
            </div>
            <div class="content">
              <p>Dear ${data.fullName},</p>
              
              <p>Thank you for contacting <strong>Glovanta Exim</strong>. We have received your inquiry and our team will respond to you within 24 hours.</p>
              
              <p><strong>Your inquiry details:</strong></p>
              <ul>
                <li>Product Interest: ${data.productInterest || 'General Inquiry'}</li>
                <li>Country: ${data.country}</li>
                ${data.quantity ? `<li>Quantity: ${data.quantity}</li>` : ''}
              </ul>
              
              <p>In the meantime, you can also reach us via:</p>
              <ul>
                <li>📧 Email: <a href="mailto:info@glovantaexim.com">info@glovantaexim.com</a></li>
                <li>📱 Phone: <a href="tel:+919054626928">+91 9054626928</a></li>
                <li>💬 WhatsApp: <a href="https://wa.me/919054626928">+91 9054626928</a></li>
              </ul>
              
              <div style="text-align: center;">
                <a href="https://wa.me/919054626928?text=Hi%20Glovanta%20Exim%2C%20I%20have%20a%20question" class="cta-button">Chat on WhatsApp</a>
              </div>
            </div>
            <div class="footer">
              <p><strong>Glovanta Exim</strong></p>
              <p>Premium Quality Exports from India to the World</p>
              <p>© ${new Date().getFullYear()} Glovanta Exim. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendNewsletterWelcome(email: string, name?: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Welcome to Glovanta Exim Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Welcome! 🎉</h1>
              <p style="margin: 10px 0 0 0;">You're now subscribed to Glovanta Exim</p>
            </div>
            <div class="content">
              <p>Dear ${name || 'Valued Subscriber'},</p>
              
              <p>Thank you for subscribing to <strong>Glovanta Exim</strong> newsletter!</p>
              
              <p>You'll now receive:</p>
              <ul>
                <li>📰 Latest export industry news and insights</li>
                <li>🎯 Exclusive product updates and offers</li>
                <li>💡 Expert tips for international trade</li>
                <li>📊 Market trends and analysis</li>
              </ul>
              
              <p>Stay tuned for our next newsletter!</p>
              
              <p>Best regards,<br><strong>Glovanta Exim Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Glovanta Exim. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Newsletter email error:', error);
    // Don't throw error for newsletter - it's not critical
    return { success: false };
  }
}
