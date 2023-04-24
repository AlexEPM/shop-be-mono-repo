import { All, Controller } from '@nestjs/common';
import { HttpStatusCode } from 'axios';

@Controller('/?*')
export class CommonController {
    @All()
    async getCart() {
        return {
            statusCode: HttpStatusCode.BadGateway,
            message: 'Cannot process request'
        }
    }
}
