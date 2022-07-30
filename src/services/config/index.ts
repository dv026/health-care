import { coreApi } from './../../api/core.api'
import { IConfig } from "../../interfaces/config"

export class ConfigService {
  static get(): Promise<IConfig> {
    return coreApi.get<IConfig>('/web/configuration')
      .then((response) => {
        if (response.data) {
          return response.data
        } else {
          throw new Error('null')
        }
      })
      .catch((error) => {
        throw new Error('null')
      })
  }

  static set(config: IConfig): Promise<IConfig> {
    return coreApi.patch<IConfig>('/web/configuration', config)
      .then((response) => {
        if (response.data) {
          return response.data
        } else {
          throw new Error('null')
        }
      })
      .catch((error) => {
        throw new Error('null')
      })
  }
}