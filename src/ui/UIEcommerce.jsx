import { NavBar, Footer } from "../components";

export const UIEcommerce = ({ children }) => {
    return (
        <>
            <NavBar />
                {children}
            <Footer />
        </>
    )
}