import api from "./http";

export const createPostApi = (data) => {
    return api.post('/createPost', data)
}

export const getMyPostsApi = () => {
    return api.get('/myPosts')
}