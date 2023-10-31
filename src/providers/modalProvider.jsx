import CheckoutModel from "../components/modal/checkoutModel"
import LoginModal from "../components/modal/loginModal"
import RegisterModal from "../components/modal/registerModal"
export const ModalProvider = () => {
    return (<><LoginModal /><RegisterModal /><CheckoutModel /></>)
}