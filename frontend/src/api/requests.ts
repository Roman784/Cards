import axios from 'axios';
import UserType from '../Types/UserType';
import CardType from '../Types/CardType';

export const LOGIN = "https://localhost:7010/login";
export const SIGUP = "https://localhost:7010/signup";
export const MODULES = "https://localhost:7010/modules";
export const MY_MODULES = "https://localhost:7010/modules/my";
export const MODULE = "https://localhost:7010/module";
export const DELETE_MODULE = "https://localhost:7010/modules/delete";
export const EDIT_MODULE = "https://localhost:7010/modules/edit";
export const ADD_MODULE = "https://localhost:7010/modules/add";

export async function login(name: string, password: string) { 
    return await axios.post(LOGIN, {
        name,
        password,
    }, 
    {
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
    }, 
    {
        headers: {
            Accept: "application/json", 
            "Content-Type": "application/json"
        },
    })
}

export async function getModules(url: string, user: UserType) {
    const request = url + "?userId=" + user.id.toString();
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    })
}

export async function getModule(id: number, user: UserType) {
    const request = MODULE + "?moduleId=" + id.toString() + "&userId=" + user.id.toString();
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    })
}

export async function deleteModule(id: number, user: UserType) {
    const request = DELETE_MODULE + "?id=" + id;
    return await axios.delete(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function editModule(moduleId: number, title: string, access: number, cards: CardType[], user: UserType) {
    return await axios.put(EDIT_MODULE, {
        id: moduleId,
        userId: user.id,
        title: title,
        access: access,
        cards: cards
    },
    {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function addModule(title: string, access: number, cards: CardType[], user: UserType) {
    return await axios.put(ADD_MODULE, {
        userId: user.id,
        title: title,
        access: access,
        cards: cards
    },
    {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}