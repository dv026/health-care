import Image from "next/image"
import spinner from "./../../../public/spinner.svg"

export const Loader = () => {
  return (
    <div>
      <Image src={spinner} alt="loading..." />
    </div>
  )
}
