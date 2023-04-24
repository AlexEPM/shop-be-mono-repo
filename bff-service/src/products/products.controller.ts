import {Controller, Get, Post, Query, Body} from '@nestjs/common';
import {ProductsService} from './products.service';
import {HttpStatusCode} from "axios";


@Controller()
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get('/products')
    async getAll() {
        try {
            const products = await this.productsService.getAll();

            return {
                statusCode: HttpStatusCode.Ok,
                data: products
            }
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                return {
                    statusCode: status,
                    data
                }
            }

            return {
                statusCode: HttpStatusCode.InternalServerError,
                message: e.message
            }
        }
    }

    @Get('/product')
    async getOne(@Query('productId') productId) {
        try {
            const product = await this.productsService.getOne(productId);

            return {
                statusCode: HttpStatusCode.Ok,
                data: product
            }
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                return {
                    statusCode: status,
                    data
                }
            }

            return {
                statusCode: HttpStatusCode.InternalServerError,
                message: e.message
            }
        }
    }

    @Post('/products')
    async create(@Body() body) {
        try {
            const product = await this.productsService.create(body);

            return {
                statusCode: HttpStatusCode.Ok,
                data: product
            }
        } catch (e) {
            console.log('some error', JSON.stringify(e));

            if (e.response) {
                const { status, data } = e.response;

                return {
                    statusCode: status,
                    data
                }
            }

            return {
                statusCode: HttpStatusCode.InternalServerError,
                message: e.message
            }
        }
    }
}
