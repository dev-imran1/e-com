import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: 'imran.cit.bd@gmail.com',
    pass: 'vpbb wedm wmxb tqhu',
  }
});

// async..await is not allowed in global scope, must use a wrapper
export async function mail(to, subject, text = "", html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"mern2305" <usman@gmail.com>',
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
