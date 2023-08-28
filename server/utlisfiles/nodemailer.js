const nodemailer = require("nodemailer");

exports.sendPasswordResetEmailNodeMail = async (toEmail, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // can be replaced with any email service provider
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "reset@moviedb.com", // replace with your email
    to: toEmail,
    subject: "Movie DB Password reset code",
    // text: ``, // replace with your message
    html: `
    <div style="background-image:url('https://shorturl.at/cnEQ9');width:100%;height:100vh;text-shadow: 4px 4px 2px rgba(0,0,0,0.08);  " > 
    <h1 style="text-align:center; color:#4B4453; font-size:50px;" > Password Reset Code</h1>
          <p style="text-align:center;color:gray;" >You have requested to reset your password. Please use the following verification code to reset your password:</p>
          <h2 style="text-align: center;
    background: rgba(0, 0, 0, 0.38);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    padding:20px;color:#fff; font-size:40px;">
    ${verificationCode}</h2>
          <p style="text-align:center; color:#FF8066;" >If you did not requet this, please ignore this email and your password will remain unchanged.</p>
      </div>
  `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent: " + info.response);
  return info;
};
