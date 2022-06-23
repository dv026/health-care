import { coreApi } from './../api/core.api';
import { IConfig } from "../interfaces/config";

export class ConfigService {
  static get(): Promise<IConfig | null> {
    return coreApi.get<IConfig>('/web/configuration')
      .then((response) => {
        if (response.data) {
          return response.data
        } else {
          throw new Error('null')
        }
      })
      .catch((error) => {
        return null
      })
  }
}