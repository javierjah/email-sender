import EmailService from '../services/email-sender';
import RestResponses from '../utils/RestResponses';
import createEmailMissingParamsMessage from '../utils/strings';

const RR = new RestResponses();

class EmailController {
  static async sendEmail(req, res) {
    try {
      if (
        !req.body.userName ||
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

      const email = req.body;
      const newEmail = await EmailService.sendEmail(email);

      RR.setSuccess(201, 'Email created!', newEmail);
      return RR.send(res);
    } catch (e) {
      RR.setError(400, e.message);
      return RR.send(res);
    }
  }
}

export default EmailController;
