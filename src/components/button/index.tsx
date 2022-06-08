import ButtonUnstyled, { ButtonUnstyledProps } from "@mui/base/ButtonUnstyled"

import styles from "./button.module.scss"

export const Button = ({ children, ...props }: ButtonUnstyledProps) => {
  return (
    <ButtonUnstyled {...props} className={styles.button}>
      {children}
    </ButtonUnstyled>
  )
}
