import http from 'k6/http';
import { sleep } from 'k6';
import { Rate, Gauge } from 'k6/metrics';

const errorRate = new Rate('errorRate');
const GaugeContentSize = new Gauge('ContentSize');

export const options = {
    scenarios: {
        ramp_iteration: {
            executor: 'ramping-arrival-rate',
            preAllocatedVUs: 350,
            stages: [
                { duration: '30s', target: 100 },
                { duration: '1m', target: 200 },
                { duration: '30s', target: 300 },
                { duration: '20s', target: 50 },
            ],
        },
    },
    thresholds: {
        http_req_duration: ['p(95) < 200'],
        ContentSize: ['value > 10'],
        errorRate: [
            { threshold: 'rate < 0.05', abortOnFail: true, delayAbortEval: '1m' },
        ],
    },
};

const host = __ENV.HOST || 'https://quickpizza.grafana.com';

const body = JSON.stringify({
    username: __ENV.USER_NAME,
    password: __ENV.PASSWORD,
});

export default function () {
    const resp = http.post(`${host}/api/users/token/login`, body);
    errorRate.add(resp.status >= 400);
    GaugeContentSize.add(resp.body.length);
    sleep(1);
}
