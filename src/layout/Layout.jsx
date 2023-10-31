import Footer from "./Footer"
import Header from "./Header"
import { Outlet } from 'react-router-dom'
import { ModalProvider } from "../providers/modalProvider"


const Layout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
            <ModalProvider />
        </div>
    )
}

export default Layout