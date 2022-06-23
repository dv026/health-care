import { useEffect } from "react"
import styled from "styled-components"

import { ConfigService } from "../../services/config.service"
import { useStore } from "../../stores/root-store"

const Settings: React.FC = () => {
  const { configStore } = useStore()

  useEffect(() => {
    ConfigService.get().then((config) => {
      if (config) {
        configStore.setConfig(config)
      }
    })
  }, [])

  return (
    <StyledSettings>
      {configStore.config
        ? configStore.config.defaultAmountWeight
        : "loading..."}
    </StyledSettings>
  )
}

const StyledSettings = styled.div`
  display: flex;
`

export default Settings
