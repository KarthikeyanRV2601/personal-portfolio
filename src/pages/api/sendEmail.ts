import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import { ContactPageData } from "@/app/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  console.log({
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  })

  const { name, email, message, interest, projectTime } = req.body as ContactPageData;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const constructHtml = (): string => {
    const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
            .container { 
              max-width: 600px; 
              background: #ffffff; 
              padding: 20px; 
              border-radius: 8px; 
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
              text-align: left;
            }
            h2 { color: #2c3e50; text-align: center; }
            p { margin: 10px 0; color: #555; font-size: 14px; }
            .highlight { font-weight: bold; color: #222; }
            .footer { 
              margin-top: 20px; 
              font-size: 12px; 
              color: #777; 
              text-align: center;
              padding-top: 10px;
              border-top: 1px solid #ddd;
            }
            .btn {
              display: inline-block;
              background-color: #3498db;
              color: #ffffff;
              padding: 10px 15px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>📩 New Contact Form Submission</h2>
            <p><span class="highlight">Name:</span> ${name.value}</p>
            <p><span class="highlight">Email:</span> ${email.value}</p>
            <p><span class="highlight">Interest:</span> ${interest.value}</p>
            <p><span class="highlight">Project Timeline:</span> ${projectTime.value}</p>
            <p><span class="highlight">Message:</span></p>
            <p>${message.value}</p>
            <p style="text-align: center;">
              <a href="mailto:${email.value}" class="btn">Reply to ${name.value}</a>
            </p>
            <div class="footer">
              <p>This email was generated from your website's contact form.</p>
            </div>
          </div>
        </body>
        </html>
        `;
    return emailHtml;
  }


  try {
    await transporter.sendMail({
      from: email.value,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${name.value}`,
      html: constructHtml(),
    });

    await transporter.sendMail({
      from: email.value,
      to: 'karthikeyan.r.v.2601@gmail.com',
      subject: `New Message from ${name.value}`,
      html: constructHtml(),
    });

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
}
