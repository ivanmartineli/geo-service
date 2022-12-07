import { container } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Config } from '@config/Config'
import { Routes } from '@presentation/http/Routes'

// Creates a new child container based on root container
const childContainer = container.createChildContainer()

// App registers
childContainer.registerSingleton(tokens.Config, Config)
childContainer.registerSingleton(tokens.Routes, Routes)


// geocoding
import { GeocodingService } from '@domain/geocoding/service/GeocodingService'
import { GetGeocodingController } from '@presentation/http/controllers/geocoding/GetGeocodingController'
childContainer.registerSingleton(tokens.GeocodingService, GeocodingService)
childContainer.registerSingleton(tokens.GetGeocodingController, GetGeocodingController)

// geoapify api
import { GeoapifyRepository as IGeoapifyRepository } from 'domain/geocoding/infrastructure/GeoapifyRepository'
childContainer.registerSingleton(tokens.GeoapifyRepository, IGeoapifyRepository)

export { childContainer as container }
