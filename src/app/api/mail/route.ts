import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const info = await transporter.sendMail({
      from: `"Jonathan Portfolio" <${process.env.APP_EMAIL}>`,
      to: process.env.APP_EMAIL,
      subject: `Portfolio Contact Form: ${subject}`,
      text: message, // plain‑text body
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border: 1px solid #e0e0e0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: #2c3e50;
            color: white;
            padding: 30px;
            text-align: center;
            border-bottom: 3px solid #3498db;
          }
          
          .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 8px;
          }
          
          .header p {
            font-size: 14px;
            opacity: 0.9;
          }
          
          .content {
            padding: 30px;
          }
          
          .contact-info {
            margin-bottom: 25px;
          }
          
          .info-row {
            display: flex;
            margin-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 15px;
          }
          
          .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .info-label {
            width: 80px;
            font-size: 14px;
            font-weight: 600;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .info-value {
            flex: 1;
            font-size: 16px;
            color: #333;
            font-weight: 500;
          }
          
          .message-section {
            border-top: 2px solid #3498db;
            padding-top: 20px;
          }
          
          .message-section h3 {
            font-size: 18px;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 15px;
          }
          
          .message-content {
            font-size: 16px;
            line-height: 1.6;
            color: #555;
            background: #fafafa;
            padding: 20px;
            border-left: 4px solid #3498db;
            white-space: pre-wrap;
          }
          
          .footer {
            background: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #e0e0e0;
          }
          
          .footer p {
            font-size: 12px;
            color: #888;
            margin-bottom: 5px;
          }
          
          .timestamp {
            font-size: 11px;
            color: #aaa;
          }
          
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            
            .header, .content {
              padding: 20px;
            }
            
            .info-row {
              flex-direction: column;
            }
            
            .info-label {
              width: auto;
              margin-bottom: 5px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Contact Form Submission</h1>
            <p>New message received from portfolio website</p>
          </div>
          
          <div class="content">
            <div class="contact-info">
              <div class="info-row">
                <div class="info-label">Name:</div>
                <div class="info-value">${name}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Email:</div>
                <div class="info-value">${email}</div>
              </div>
              
              <div class="info-row">
                <div class="info-label">Subject:</div>
                <div class="info-value">${subject}</div>
              </div>
            </div>
            
            <div class="message-section">
              <h3>Message</h3>
              <div class="message-content">${message}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>This message was sent from your portfolio contact form</p>
            <div class="timestamp">Received: ${new Date().toLocaleString()}</div>
          </div>
        </div>
      </body>
      </html>
    `, // HTML body
    });

    console.log("Message sent: %s", info.messageId);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! I'll get back to you soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
