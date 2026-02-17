import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {

    console.log('Entering AuthMiddleware');
    const apiKey = ctx.request.header('x-api-key');
    console.log(apiKey);
    if (!apiKey || apiKey!==process.env.API_KEY) {
       return ctx.response.status(401).json({
          message: 'Invalid or missing API key',
       });
    }

    const res =  await next();
    console.log('Returning response in AuthMiddleware');
    return res;
  }
}