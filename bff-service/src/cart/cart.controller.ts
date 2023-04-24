import {Controller, Get, Post, Query, Body, Delete, Put} from '@nestjs/common';
import {CartService} from './cart.service';
import {HttpStatusCode} from 'axios';

@Controller('/cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Get()
    async getCart(@Query('userId') userId) {
        try {
            const cart = await this.cartService.getCart(userId);

            return {
                statusCode: HttpStatusCode.Ok,
                data: cart
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

    @Put()
    async create(@Body() body) {
        try {
            const cart = await this.cartService.create(body);

            return {
                statusCode: HttpStatusCode.Ok,
                data: cart
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

    @Post('/checkout')
    async checkout(@Body() body) {
        try {
            const cart = await this.cartService.checkout(body);

            return {
                statusCode: HttpStatusCode.Ok,
                data: cart
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

    @Delete()
    async delete(@Query('userId') userId) {
        try {
            const cart = await this.cartService.delete(userId);

            return {
                statusCode: HttpStatusCode.Ok,
                data: cart
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
