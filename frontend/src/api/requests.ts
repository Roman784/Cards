import axios from 'axios';
import IUser from '../types/IUser';
import ICard from '../types/ICard';

export const LOGIN = "https://localhost:7010/login";
export const SIGUP = "https://localhost:7010/signup";
export const MODULES = "https://localhost:7010/modules";
export const MY_MODULES = "https://localhost:7010/modules/my";
export const MODULE = "https://localhost:7010/module";
export const DELETE_MODULE = "https://localhost:7010/modules/delete";
export const EDIT_MODULE = "https://localhost:7010/modules/edit";
export const ADD_MODULE = "https://localhost:7010/modules/add";
export const FAVORITE_MODULE_IDS = "https://localhost:7010/modules/favorites/ids";
export const FAVORITE_MODULES = "https://localhost:7010/modules/favorites";
export const SET_FAVORITE_MODULES = "https://localhost:7010/modules/favorites/set";
export const ACTIVITIES = "https://localhost:7010/activities";
export const GET_ACTIVITY = "https://localhost:7010/activities/get";
export const UPDATE_ACTIVITY = "https://localhost:7010/activities/update";

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

export async function getModules(url: string, user: IUser) {
    const request = url + "?userId=" + user.id.toString();
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    })
}

export async function getModule(id: number, user: IUser) {
    const request = MODULE + "?moduleId=" + id.toString() + "&userId=" + user.id.toString();
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    })
}

export async function deleteModule(id: number, user: IUser) {
    const request = DELETE_MODULE + "?id=" + id;
    return await axios.delete(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function editModule(moduleId: number, title: string, access: number, cards: ICard[], user: IUser) {
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

export async function addModule(title: string, access: number, cards: ICard[], user: IUser) {
    return await axios.post(ADD_MODULE, {
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

export async function getFavoriteModuleIds(user: IUser) {
    const request = FAVORITE_MODULE_IDS + "?userId=" + user.id;
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function setFavoriteModules(user: IUser, moduleId: number, value: boolean) {
    const request = SET_FAVORITE_MODULES + "?userId=" + user.id + "&moduleId=" + moduleId + "&value=" + value;
    return await axios.put(request, {}, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function getActivities(user: IUser) {
    const request = ACTIVITIES + "?userId=" + user.id;
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function getActivity(user: IUser, year: number, month: number, day: number) {
    const request = GET_ACTIVITY + "?userId=" + user.id + "&year=" + year + "&month=" + month + "&day=" + day
    return await axios.get(request, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}

export async function updateActivity(user: IUser, year: number, month: number, day: number, studyTime: number) {
    const request = UPDATE_ACTIVITY + "?userId=" + user.id + "&year=" + year + "&month=" + month + "&day=" + day + "&studyTime=" + studyTime;
    return await axios.put(request, {}, {
        headers: {
            Accept: "application/json",
            "Authorization": "Bearer " + user.accessToken
        },
    });
}