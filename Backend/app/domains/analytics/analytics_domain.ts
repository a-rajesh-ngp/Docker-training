import Analytics from "#models/analytics/analytics";


export default class AnalyticsDomain{
    createLog(res: Analytics) {
        return {
            status: 'success',
            data: res
        };
    }

}