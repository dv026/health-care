import React from "react"
import styled from "styled-components"

import { accentColor } from "../../common/colors"

export const Input: React.FC<React.ComponentPropsWithRef<'input'>> = (props) => {
  return <StyledInput {...props} />
}

const StyledInput = styled.input`
  width: 100%;
  border-radius: 10px;
  height: 45px;
  padding-left: 15px;
  border: 0.5px solid ${accentColor};
  box-sizing: border-box;
  font-size: 20px;

  &:focus-visible {
    outline: none;
  }

  &:hover, &:focus {
    border: 1px solid ${accentColor};
  }
`