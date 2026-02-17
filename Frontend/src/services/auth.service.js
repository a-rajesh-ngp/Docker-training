import api from "./http";

export const signupApi = (payload) => {
    return api.post('/createUser', payload)
}

export const loginApi = (payload) => {
    return api.post('/login', payload)
}