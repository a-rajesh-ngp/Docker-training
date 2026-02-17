import api from "./http";

export const getUsersApi = (page=1, limit=10, search='', sortColumn='username', sortDirection='asc') => {
    
    console.log('search', search)
    return api.get('/users', {
        params: {
            page,
            limit,
            search: search || undefined,
            'sort[column]': sortColumn,
            'sort[direction]': sortDirection
        }
    })
}

export const updateEmailApi = (userId, payload) => {
    console.log('userId', userId)
    return api.patch(`updateEmailForUser/${userId}`, payload)
}

export const deleteUser = (userId) => {
    return api.delete(`deleteUser/${userId}`)
}