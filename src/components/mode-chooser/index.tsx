import { FC } from "react"
import styled, { css } from "styled-components"

import { IMode } from "../../pages/login"

interface ModeChooser {
  mode: IMode
  setMode: (mode: IMode) => void
}

export const ModeChooser: FC<ModeChooser> = ({ setMode, mode }) => {
  return (
    <Container>
      <ModeItem active={mode === "signIn"} onClick={() => setMode("signIn")}>
        Sign In
      </ModeItem>
      <ModeItem active={mode === "signUp"} onClick={() => setMode("signUp")}>
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
  color: rgba(150, 150, 150, 0.5);

  &:hover {
    border-bottom: 1px solid blue;
  }

  ${(props) =>
    props.active &&
    css`
      border-bottom: 1px solid blue;
      color: black;
    `}
`
