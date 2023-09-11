import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  if (!req.body) {return false;}

  const { fullname, email, subject, message, recaptchaResponse } = req.body;

  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaResponse}`;


    try {
      const recaptchaVerifyResponse = await fetch(recaptchaVerifyUrl, {
        method: 'POST',
      });
  
      const recaptchaData = await recaptchaVerifyResponse.json();
  
      if (!recaptchaData.success) {
        res.status(400).json({ error: 'reCAPTCHA verification failed.' });
        return;
      }

      await sendgrid.send({
        to: "yours.truly@mattondo.com",
        from: "yours.truly@mattondo.com",
        subject: `[Lead from website] : ${subject}`,
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
            <h3>You've got a new mail from ${fullname}, their email is: ✉️${email} </h3>
            <div style="font-size: 16px;">
              <p>Message:</p>
              <p>${message}</p>
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