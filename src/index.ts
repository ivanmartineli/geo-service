import 'reflect-metadata'
import { Config } from '@config/Config'
import app from '@presentation/http/App'

const config = new Config()
const port = config.get().port

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
