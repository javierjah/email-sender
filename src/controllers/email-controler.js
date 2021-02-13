import EmailService from '../services/email-sender';
import RestResponses from '../utils/RestResponses';
import { createEmailMissingParamsMessage, createContactEmailMissingParamsMessage } from '../utils/strings';

const RR = new RestResponses();

class EmailController {
  static async sendEmail(req, res) {
    try {
      if (
        !req.body.userName ||
        !req.body.email ||
        !req.body.orderNumber ||
        !req.body.phoneNumber ||
        !req.body.totalAmount ||
        !req.body.paymentType ||
        !req.body.deliveryDate ||
        !req.body.address ||
        !req.body.products ||
        !req.body.products.length === 0 ||
        req.body.deliveryCost === undefined
      ) {
        const errorMsg = createEmailMissingParamsMessage(req.body);
        RR.setError(400, errorMsg);
        return RR.send(res);
      }

      const email = req.body.email;
      const emailData = req.body;

      const newEmail = await EmailService.sendEmail(email, emailData);

      RR.setSuccess(201, 'Email created!', newEmail);
      return RR.send(res);
    } catch (e) {
      RR.setError(400, e.message);
      return RR.send(res);
    }
  }

  static async sendContactEmail(req, res) {
    const SERVICE_CONTACT_EMAIL = 'serviceContactEmail';
    try {
      if (
        !req.body.userName ||
        !req.body.email ||
        !req.body.companyEmail ||
        !req.body.phoneNumber ||
        !req.body.description ||
        !req.body.companyName
      ) {
        const errorMsg = createContactEmailMissingParamsMessage(req.body);
        RR.setError(400, errorMsg);
        return RR.send(res);
      }

      const template = req.body.template || SERVICE_CONTACT_EMAIL;
      const subject = req.body.subject || 'Contacto de Servicio';
      const email = req.body.companyEmail;
      const emailData = req.body;

      const newEmail = await EmailService.sendContactEmail(email, emailData, subject, template);

      RR.setSuccess(201, 'Email Sended!', newEmail);
      return RR.send(res);
    } catch (e) {
      RR.setError(400, e.message);
      return RR.send(res);
    }
  }
}

export default EmailController;
