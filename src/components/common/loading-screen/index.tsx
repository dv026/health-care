import { Loader } from "../loader"

import styles from "./loading-screen.module.scss"

export const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <Loader />
    </div>
  )
}
