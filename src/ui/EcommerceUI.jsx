import { Footer, NavBar } from "../components"

export const EcommerceUI = ({children}) => {
  return (
    <>
        <NavBar />
          {children}
        <Footer />
    </>
  )
}
