import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const EcommerceApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  )
}
