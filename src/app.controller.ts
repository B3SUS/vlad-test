import {Body, Controller, Post, Query} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post('signal')
    getData(
        @Body('entryPrice') entryPrice: string,
        @Body('takeProfit') takeProfit: string,
        @Body('stopLoss') stopLoss: string,
    ) {
        console.log(entryPrice);
        console.log(takeProfit);
        console.log(stopLoss);
        return {message: 'Message sent', entryPrice, takeProfit, stopLoss};

    }
}
