import http from 'k6/http';
import { group, check } from "k6"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.2.0/dist/bundle.js";

export function handleSummary(data) {
    return {
      "performancetest_report.html": htmlReport(data),
    };
}

export const options = {
    vus: 1000, 
    iterations: 3500, 
    // duration: "2s",
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(99)<2000'], // 95% of requests should be below 2000ms (2s)
    },
};

const baseUrl = 'https://reqres.in/api/users';
const baseUrl_User2 = 'https://reqres.in/api/users/2';

const params = {
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function () {
    //Create User, POST API method
    group('Create User', function (){
        //...
        let createData = JSON.stringify({
            name: 'morpheus',
            job: 'leader',
        });

        const responsePost = http.post(baseUrl, createData, params);
        check(responsePost, {
            'response code status was 201 Created': (resPost) => resPost.status == 201,
       });
    });

    //Update User, PUT API method
    group('Update User', function (){
        //...
        let updateData = JSON.stringify({
            name: 'morpheus',
            job: 'zion resident',
        });
        const responsePut = http.put(baseUrl_User2, updateData, params);
        check(responsePut, {
            'response code status was 200 OK': (resPut) => resPut.status == 200,
       });
    });
}
