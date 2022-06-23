import React from "react"
import { Header } from "../components/header"

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout
