
import { Footer, NavBar } from './../components/';

export const UIEcommerce = ({children}) => {
  return (
    <>
        <NavBar />
        {children}
        <Footer />
    </>
  )
}
