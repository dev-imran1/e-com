export function verificationTemp(link) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 50px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 20px;">
        <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          <h1 style="margin: 0;">Welcome to Our Service</h1>
        </div>
        <div style="margin: 20px 0;">
          <h2 style="color: #4CAF50; margin: 0 0 10px 0;">Hello [User's Name],</h2>
          <p style="margin: 0 0 20px 0;">Thank you for signing up for our service! We're excited to have you on board. Please click the button below to verify your email address and get started.</p>
          <a href="${process.env.API_URL}/users/${link}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          
          </div>
          <div style="text-align: center; color: #777777; margin-top: 20px; font-size: 12px;">
          <p>${process.env.API_URL}/user/${link} </p>
          
          <p>If you did not sign up for this account, please ignore this email.</p>
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `
}