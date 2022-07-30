import axios from "axios"
import { observer } from "mobx-react-lite"
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import styled from "styled-components"
import { Button } from "../../components/common/button"
import { Input } from "../../components/common/input"
import { NotificationType } from "../../interfaces/notification"

import { ConfigService } from "../../services/config"
import { useStore } from "../../stores/root-store"

const Settings: React.FC = observer(() => {
  const { configStore, notificationStore } = useStore()
  const [defaultAmountWeight, setDefaultAmountWeight] = useState<number>()
  const [theme, setTheme] = useState<string>()

  useEffect(() => {
    ConfigService.get().then((config) => {
      if (config) {
        configStore.setConfig(config)
      }
    })
  }, [])

  useEffect(() => {
    setDefaultAmountWeight(configStore.config.defaultAmountWeight)
    setTheme(configStore.config.defaultTheme)
  }, [configStore.config])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ConfigService.set({
      defaultAmountWeight: defaultAmountWeight || 1,
      defaultTheme: theme || "",
    })
      .then((response) => {
        configStore.setConfig(response)
        notificationStore.showNotification({
          type: NotificationType.Success,
          message: "Successfully updated",
        })
      })
      .catch(() => {
        notificationStore.showNotification({
          type: NotificationType.Error,
          message: "Error while updating",
        })
      })
  }

  const validate = (value: string) => {
    return parseInt(value)
  }

  return (
    <StyledSettingsPage>
      {configStore.config ? (
        <StyledSettings>
          <StyledHeader>Settings</StyledHeader>
          <StyledForm method="POST" onSubmit={handleSubmit}>
            <Input
              value={defaultAmountWeight}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value
                if (validate(inputValue)) {
                  setDefaultAmountWeight(parseInt(e.target.value))
                }
              }}
            />
            <Input
              value={theme}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTheme(e.target.value)
              }
            />
            <StyledButtonContainer>
              <Button type="submit">Save</Button>
            </StyledButtonContainer>
          </StyledForm>
        </StyledSettings>
      ) : (
        "loading..."
      )}
    </StyledSettingsPage>
  )
})

const StyledSettingsPage = styled.div`
  display: flex;
  justify-content: center;
`

const StyledSettings = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const StyledHeader = styled.div`
  font-size: 30px;
  text-align: center;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledButtonContainer = styled.div`
  text-align: center;
`

export default Settings
