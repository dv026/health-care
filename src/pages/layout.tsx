import React from "react"
import styled from "styled-components"
import { Header } from "../components/common/header"
import { Notifications } from "../components/common/notifications"

const Layout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div>
      <Notifications />
      <Header />
      <StyledBody>{children}</StyledBody>
    </div>
  )
}

const StyledBody = styled.div`
  padding: 10px 0;
`

export default Layout
