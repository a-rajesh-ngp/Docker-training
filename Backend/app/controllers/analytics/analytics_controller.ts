import type { HttpContext } from '@adonisjs/core/http'
import { CreateLogPayload, createLogValidator } from '#validators/analytics/create_log';
import AnalyticsRepository from '../../repositories/analytics/analytics_repository.js';

export default class AnalyticsController {
    protected analyticsRepository = new AnalyticsRepository()

    public async createLog({request}: HttpContext) {
        const validatedData: CreateLogPayload = await request.validateUsing(createLogValidator);
        return this.analyticsRepository.createLog(validatedData.log);
        
    }
}