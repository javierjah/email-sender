export function createEmailMissingParamsMessage(body) {
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
  const name = !body.name ? 'name' : '';
  const description = !body.description ? 'description' : '';
  const companyEmail = !body.companyEmail ? 'companyEmail' : '';
  const subject = !body.subject ? 'subject' : '';

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
    name,
    description,
    companyEmail,
    subject,
  ].filter(i => i !== '');
  const missingParams = missingParamsFilter.join(', ');

  return `Missing following params: ${missingParams}`;
}

export function createContactEmailMissingParamsMessage(body) {
  const email = !body.email ? 'email' : '';
  const userName = !body.userName ? 'userName' : '';
  const phoneNumber = !body.phoneNumber ? 'phoneNumber' : '';
  const description = !body.description ? 'description' : '';
  const companyEmail = !body.companyEmail ? 'companyEmail' : '';
  const companyName = !body.companyName ? 'companyName' : '';

  const missingParamsFilter = [email, userName, phoneNumber, description, companyEmail, companyName].filter(
    i => i !== '',
  );
  const missingParams = missingParamsFilter.join(', ');

  return `Missing following params: ${missingParams}`;
}
