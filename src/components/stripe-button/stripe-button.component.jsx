import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_E0Couex0Pz1k0SGhIBjtpQig00kH6CdMNH';

const onToken = token => {
    console.log('stripe token', token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      nam='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;