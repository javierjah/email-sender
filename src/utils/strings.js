function createEmailMissingParamsMessage(body) {
  const email = !body.email ? 'email' : '';
  const userName = !body.userName ? 'userName' : '';
  const orderNumber = !body.orderNumber ? 'orderNumber' : '';
  const phoneNumber = !body.phoneNumber ? 'phoneNumber' : '';
  const totalAmount = !body.totalAmount ? 'totalAmount' : '';
  const paymentType = !body.paymentType ? 'paymentType' : '';
  const deliveryDate = !body.deliveryDate ? 'deliveryDate' : '';
  const address = !body.address ? 'address' : '';
  const products = !body.products || !body.products.length === 0 ? 'products' : '';
  const deliveryCost = !body.deliveryCost ? 'deliveryCost' : '';

  const missingParamsFilter = [
    email,
    userName,
    phoneNumber,
    orderNumber,
    totalAmount,
    paymentType,
    deliveryDate,
    address,
    products,
    deliveryCost,
  ].filter(i => i !== '');
  const missingParams = missingParamsFilter.join(', ');

  return `Missing following params: ${missingParams}`;
}

export default createEmailMissingParamsMessage;
