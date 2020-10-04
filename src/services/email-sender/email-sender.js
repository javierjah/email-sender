import path from 'path';
import nodemailer from 'nodemailer';
import EmailTemplates from 'email-templates';

const templateDir = path.resolve(__dirname, 'templates', 'purchase');
const defaultSubject = 'Pedido Agua y Arina  ✔';
const EMAILS = ['javier.palacios.h@gmail.com', 'dominic.fernandezv@gmail.com'];

// email-templates init to parse html files
const email = new EmailTemplates({
  preview: true,
  views: {
    options: {
      extension: 'ejs',
    },
  },
});

async function emailSender({ emailTo = EMAILS, subject = defaultSubject, emailParams }) {
  const emailSenderConfig = {
    path: templateDir,
    juiceResources: {
      preserveImportant: true,
      webResources: {
        relativeTo: templateDir,
      },
    },
  };

  try {
    const htmlTemplate = await email.render(emailSenderConfig, emailParams);
    // email config vars
    const EMAIL = process.env.EMAIL;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const OAUTH2_CLIENT_ID = process.env.OAUTH2_CLIENT_ID;
    const OAUTH2_CLIENT_SECRET = process.env.OAUTH2_CLIENT_SECRET;
    const OAUTH2_REFRESH_TOKEN = process.env.OAUTH2_REFRESH_TOKEN;
    const OAUTH2_ACCESS_TOKEN = process.env.OAUTH2_ACCESS_TOKEN;

    // nodemailer transport config
    const transportConfigDev = {
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
      },
    };

    const transportconfigProd = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        clientId: OAUTH2_CLIENT_ID,
        clientSecret: OAUTH2_CLIENT_SECRET,
      },
    };

    let transporterConfig = transportConfigDev;

    if (process.env.NODE_ENV === 'production') {
      transporterConfig = transportconfigProd;
    }

    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
      to: emailTo,
      subject,
      html: htmlTemplate,
      auth:
        process.env.NODE_ENV === 'production'
          ? {
              user: EMAIL,
              refreshToken: OAUTH2_REFRESH_TOKEN,
              accessToken: OAUTH2_ACCESS_TOKEN,
              expires: 3599,
            }
          : undefined,
    };

    const emailInfo = await transporter.sendMail(mailOptions);
    const response = {
      recipients: emailInfo.accepted,
      info: emailInfo.response,
    };

    return response;
  } catch (e) {
    console.error('Email render error:', e);
    throw e;
  }
}

class EmailService {
  static async sendEmail(emailData) {
    try {
      const newEmail = await emailSender({ emailParams: emailData });

      return newEmail;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default EmailService;
