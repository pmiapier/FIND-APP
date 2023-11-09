import axios from '../../../config/axios'

const returnHome = () => {
  window.location.href = "/";
};

// Here we will call the verifyPayment endpoint from backend with the stripe session ID
export default function StripeSuccess() {
  const sendResponse = axios.post('/rent/verifyPayment', { sessionId: window.location.search.split('=')[1], success: true });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-semibold">Thank you for your renting</div>
      <div className="text-2xl font-semibold mb-2">We will not give your money back</div>

        <button className="bg-blue-500 p-4 text-white rounded-lg" onClick={returnHome}>Back to home</button>
    </div>
  );
}
