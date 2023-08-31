import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  console.log(req.body);
  try {
    await sendgrid.send({
      to: `${req.body.email}`,
      from: "yours.truly@mattondo.com",
      subject: `Thanks for reacing out!`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Matt Ondo</title>
        <meta name="description" content="Matt Ondo">
        <meta name="author" content="SitePoint">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      </head>
      
      <body>
          <h3>Hey ${req.body.fullname}! </h3>
          <div style="font-size: 16px;">
            <p>Thanks for reaching out, I'll get back to you soon!</p>
            <p>Best,<br>- Matt</p>
            <br>
          </div>
      </body>
      </html>`,
    });
  } catch (error) {
    // console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;