import styled from "styled-components"
import { accentColor } from "../../common/colors"
import { boxShadow } from "../../common/mixins"

export const Button: React.FC<React.PropsWithChildren<React.HTMLProps<HTMLButtonElement>>> = ({ children, onClick, className }) => {
  return (
    <ButtonStyled onClick={onClick} className={className}>
      {children}
    </ButtonStyled>
  )
}


const ButtonStyled = styled.button`
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
`
