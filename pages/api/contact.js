import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  if (!req.body) {return false;}

  const { name, email, subject, message, gtoken } = req.body;

  const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${gtoken}`;

  try {
    const recaptchaVerifyResponse = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
    });

    const recaptchaData = await recaptchaVerifyResponse.json();

    if (!recaptchaData.success) {
      res.status(400).json({ error: 'reCAPTCHA verification failed.' });
      return;
    }

    const alertEmailMsg = {
      to: 'yours.truly@mattondo.com',
      from: 'yours.truly@mattondo.com',
      subject: `[Website Message] ${subject}`,
      template_id: 'd-5b2f4b63e38941a4bc40241780fc99ec',
      dynamic_template_data: {
        name: name,
        email: email,
        subject: subject,
        message: message,
      },
    }

    await sendgrid.send(alertEmailMsg);

    const followupEmailMsg = {
      to: 'yours.truly@mattondo.com',
      from: 'yours.truly@mattondo.com',
      subject: `Thanks for reaching out!`,
      template_id: 'd-f86f0f80d69a4a43b8c17cd4fd935ff2',
      dynamic_template_data: {
        name: name,
      },
    }

    await sendgrid.send(followupEmailMsg);

  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: "" });

}

export default sendEmail;