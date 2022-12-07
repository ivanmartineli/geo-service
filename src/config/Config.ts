import dotenv from 'dotenv'
import { injectable } from 'tsyringe'

/**
 * A simple application configuration interface.
 */
interface Configuration {
  // HTTP port when running application
  port: number

  serviceName: string
  environment: string
  instance?: string

  urlGeoApi: {
    url: string
  }

}

/**
 * A simple injectable Config class, with a single `get` method that returns
 * the entire config.
 */
@injectable()
export class Config {
  private readonly config: Configuration

  constructor() {
    this.config = this.getConfigFromEnv()
  }

  public get(): Configuration {
    return this.config
  }

  private getConfigFromEnv(): Configuration {
    dotenv.config()

    return {
      serviceName: process.env.SERVICE_NAME || 'geo-service',
      environment: process.env.NODE_ENV || 'development',

      port: Number(process.env.PORT) || 80,

      urlGeoApi: {
        url: process.env.URL_GEOAPIFY_API || ''
      }

    }
  }
}
