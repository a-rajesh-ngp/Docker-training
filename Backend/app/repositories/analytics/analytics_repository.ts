import Analytics from "#models/analytics/analytics";
import AnalyticsDomain from "../../domains/analytics/analytics_domain.js";


export default class AnalyticsRepository {
    protected analyticsDomain = new AnalyticsDomain()

    async createLog(log: string) {
        const res: Analytics = await Analytics.create({log});
        return this.analyticsDomain.createLog(res);
        
    }

}