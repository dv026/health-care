import { FC } from "react"
import styled, { css } from "styled-components"
import { accentColor, disabledColor } from "../../../common/colors"

import { AuthMode } from "../../../pages/login"

interface ModeChooser {
  mode: AuthMode
  setMode: (mode: AuthMode) => void
}

export const ModeChooser: FC<ModeChooser> = ({ setMode, mode }) => {
  return (
    <Container>
      <ModeItem
        active={mode === AuthMode.SignIn}
        onClick={() => setMode(AuthMode.SignIn)}
      >
        Sign In
      </ModeItem>
      <ModeItem
        active={mode === AuthMode.Registration}
        onClick={() => setMode(AuthMode.Registration)}
      >
        Sign Up
      </ModeItem>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  gap: 20px;
`

const ModeItem = styled.div<{ active: boolean }>`
  cursor: pointer;
  height: 20px;
  color: ${disabledColor};

  &:hover {
    border-bottom: 1px solid ${accentColor};
  }

  ${(props) =>
    props.active &&
    css`
      border-bottom: 1px solid ${accentColor};
      color: black;
    `}
`
