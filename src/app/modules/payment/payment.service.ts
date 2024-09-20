import { join } from 'path';
import { BookingModel } from '../bookings/bookings.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import config from '../../config';

const paymentConfirmationIntoDB = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let messageTitle;
  let message;
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await BookingModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'paid' },
      { new: true },
    );
    messageTitle = 'Congratulation!';
    message = 'Payment Successful.';
  } else {
    messageTitle = 'Oops!';
    message = 'Payment Failed.';
  }

  const filePath = join(__dirname, '../../../views/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');
  template = template.replace('{{message-title}}', messageTitle);
  template = template.replace('{{message}}', message);
  template = template.replace('{{home-url}}', config.frontend_url as string);

  return template;
};

export const PaymentServices = {
  paymentConfirmationIntoDB,
};
