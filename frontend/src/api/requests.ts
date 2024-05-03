import axios from 'axios';

const LOGIN = "https://localhost:7010/login";
const SIGUP = "https://localhost:7010/signup";

export async function login(name: string, password: string) { 
    return await axios.post(LOGIN, {
        name,
        password,
    }, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
}

export async function sigup(name: string, password: string) {
    return await axios.put(SIGUP, {
        name,
        password,
    }, {
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json"
        },
    })
}