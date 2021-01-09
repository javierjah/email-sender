import { Router } from 'express';

import EmailController from '../controllers/email-controler';

const router = Router();

// router.get('/', EmailController.getAllBreads);
router.post('/', EmailController.sendEmail);
router.post('/contact', EmailController.sendContactEmail);
// router.get('/:id', EmailController.getABread);
// router.put('/:id', EmailController.updatedBread);
// router.delete('/:id', EmailController.deleteBread);

export default router;
