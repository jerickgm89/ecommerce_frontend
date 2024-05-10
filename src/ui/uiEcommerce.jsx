import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";

export const uiEcommerce = ({ children }) => {
    return (
        <>
            <NavBar />
                { children }
            <Footer />
        </>
    )
}