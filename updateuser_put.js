import http from 'k6/http';
import { check } from "k6";


//POST API test for Create User
export default function createUser(){
    const url = 'https://reqres.in/api/users/2';
    const payload = JSON.stringify({
        name: 'morpheus',
        job: 'zion resident',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = http.post(url, payload, params);
    check(res, {
        'response code status was 200 OK': (r) => r.status == 201,
   });

}