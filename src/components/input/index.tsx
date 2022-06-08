import InputUnstyled, { InputUnstyledOwnProps } from "@mui/base/InputUnstyled"
import styles from "./input.module.scss"

export const Input = (props: InputUnstyledOwnProps) => {
  return <InputUnstyled {...props} className={styles.input} />
}
