import Image from "next/image"
import styled from "styled-components"

import loader from "./../../../../public/loader.svg"

export const Loader = () => {
  return (
    <StyledLoader
      src={loader}
      alt="loading..."
      width={40}
      height={40}
      style={{ color: "blue" }}
    />
  )
}

const StyledLoader = styled(Image)`
  filter: invert(100%) sepia(0%) saturate(7479%) hue-rotate(261deg)
    brightness(112%) contrast(96%);
`
