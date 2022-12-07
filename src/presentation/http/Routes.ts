import { inject, injectable } from 'tsyringe'
import { tokens } from '@di/tokens'
import { Request, Response, Router } from 'express'
import { GetGeocodingController } from './controllers/geocoding/GetGeocodingController'

@injectable()
export class Routes {
  constructor(

    @inject(tokens.GetGeocodingController)
    private getGeoController: GetGeocodingController,


  ) { }

  public setupRouter(router: Router): void {

    router.get('/geocoding', (req: Request, res: Response) =>
      this.getGeoController.getAddress(req, res)
    )

  }
}
