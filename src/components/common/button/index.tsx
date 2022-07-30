import styled from "styled-components"
import { accentColor } from "../../../common/colors"
import { boxShadow } from "../../../common/mixins"

export const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, className, ...props }) => {
  return (
    <ButtonStyled className={className} {...props}>
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled.button<any>`
  width: 150px;
  height: 40px;
  border-radius: 5px;
  background-color: ${accentColor};
  border: none;
  box-sizing: border-box;
  color: white;
  cursor: pointer;

  ${boxShadow}

  &:hover {
    box-shadow: none;
  }

  &:disabled {
    pointer-events: none;
  }
`
