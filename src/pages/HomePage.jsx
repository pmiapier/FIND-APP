import StripeCheckout from '../components/checkout/stripe-checkout/StripeCheckout';
import Home from '../components/home/Home';
export default function HomePage() {
  return (
    <div className="">
      <Home />
      <StripeCheckout />
    </div>
  );
}
