import { useRouter } from "next/router"
import styled from "styled-components"
import { accentColor, backgroundColor, headerColor } from "../../common/colors"
import { headerHeight } from "../../common/constants"
import { AuthService } from "../../services/auth.service"
import { useStore } from "../../stores/root-store"
import Select from "react-select"
import React, { useCallback, useMemo, useRef } from "react"
import { LineDropdown } from "../line-dropdown"

export const Header = () => {
  const { push } = useRouter()
  const { authStore } = useStore()

  const handleLogout = useCallback(async () => {
    try {
      await AuthService.logout()
      push("/login")
    } catch (e) {}
  }, [push])

  const userOptions = useMemo(
    () => [
      {
        label: "Settings",
        onClick: () => push("/settings"),
      },
      {
        label: "Logout",
        onClick: handleLogout,
      },
    ],
    [handleLogout, push]
  )

  return (
    <StyledHeader>
      <HeaderBox>
        <HeaderLink onClick={() => push("/")}>Home</HeaderLink>
      </HeaderBox>
      <HeaderBox>
        <HeaderLink onClick={() => push("/about")}>About</HeaderLink>
        {authStore.user && (
          <LineDropdown
            options={userOptions}
            label={authStore.user.email}
            accentColor={accentColor}
          />
        )}
      </HeaderBox>
    </StyledHeader>
  )
}

const StyledHeader = styled.div`
  height: ${headerHeight + "px"};
  background-color: ${headerColor};
  display: flex;
  justify-content: space-between;
`

const HeaderBox = styled.div`
  display: flex;
`

const HeaderLink = styled.div`
  color: white;
  width: 100px;
  text-align: center;
  align-self: center;
  cursor: pointer;

  &:hover {
    color: ${accentColor};
  }
`

interface HoverFocusWrapper {
  selectRef: React.RefObject<HTMLDivElement>
}

const HoverFocusWrapper: React.FC<
  React.PropsWithChildren<HoverFocusWrapper>
> = ({ children, selectRef }) => {
  return (
    <div
      onMouseEnter={() => selectRef.current?.focus()}
      onMouseLeave={() => selectRef.current?.blur()}
    >
      {children}
    </div>
  )
}
