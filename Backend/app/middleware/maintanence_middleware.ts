import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
// import env from '#start/env';

export default class MaintanenceMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    // console.log(ctx)
    console.log('Entered server middleware...');
    if (process.env.MAINTENANCE=='true') {
      return ctx.response.status(403).json({
        message: 'Server is under maintenance'
      })
    }
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    console.log('Returning response in MaintanenceMiddleware');
    return output
  }
}