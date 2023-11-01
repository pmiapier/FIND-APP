import Router from "./router/Router";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
