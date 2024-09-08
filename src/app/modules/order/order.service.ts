import Stripe from 'stripe';
import Order from './order.model';
import { Booking } from '../booking/booking.model';
 // Assuming you have a Booking model

const stripe = new Stripe('sk_test_51NFUAjEsme57IV63dwFayl3ylE4AkUlo1HMudKyTVT6sfNyyW5xe64gKiApCMJxezmgww9UmkTVycPliakNYGiJl00W1rKS6SL', {
});

export const createOrder = async (booking: any) => {
  // Create Stripe customer
  const customer = await stripe.customers.create({
    email: booking.user.email,
    name: booking.user.name,
  });


  const lineItems = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: booking.room.name,
        },
        unit_amount: booking.room.pricePerSlot * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer: customer.id,
    success_url: 'https://meeting-room-theta.vercel.app/success',
    cancel_url: 'https://meeting-room-theta.vercel.app/cancel',
  });


  const orderData = {
    user: booking.user.name,
    email: booking.user.email,
    room_name: booking.room.name,
    total_amount: booking.totalAmount,
    date: new Date(booking.date),  
    transaction_id: session.id,
  };

  await Order.create(orderData);

  await Booking.findByIdAndUpdate(booking._id, { isConfirmed: 'confirm' });

  return session.id;
};
