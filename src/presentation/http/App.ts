import { container } from '@di/container'
import { tokens } from '@di/tokens'
import { Routes } from './Routes'
import createRouter from './router/createRouter'
import express from 'express'

const app = express()

const router = createRouter()
const routes = container.resolve<Routes>(tokens.Routes)

routes.setupRouter(router)
app.use(router)

export default app
