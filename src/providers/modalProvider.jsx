import CheckoutModel from "../modal/checkoutModel"
import LoginModal from "../modal/loginModal"
import RegisterModal from "../modal/registerModal"

export const ModalProvider = () => {
    return (<><LoginModal /><RegisterModal /><CheckoutModel /></>)
}