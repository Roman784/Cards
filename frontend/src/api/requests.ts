import axios from 'axios';
import UserType from '../Types/UserType';

export const LOGIN = "https://localhost:7010/login";
export const SIGUP = "https://localhost:7010/signup";
export const MODULES = "https://localhost:7010/modules";
export const MY_MODULES = "https://localhost:7010/modules/my";

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

export async function getModules(url: string, user: UserType) {
    return await axios.get(url + "?userId=" + user.id.toString(), {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    })
}
