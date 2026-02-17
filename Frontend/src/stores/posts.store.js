import { defineStore } from "pinia";
import { ref } from "vue";
import { createPostApi, getMyPostsApi } from "../services/post.service";


export const usePostsStore = defineStore('posts', ()=> {
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchMyPosts = async() => {
        loading.value = true
        try {
            const res = await getMyPostsApi()
            posts.value = res.data.data
        } catch(err) {
            error.value = err.response?.data?.message || 'Failed to fetch posts'
            throw err
        } finally {
            loading.value = false
        }
    }

    const createPost = async(payload) => {
        try {
            loading.value = true
            error.value = null

            await createPostApi(payload)

            // await fetchMyPosts()
        } catch(err) {
            error.value = err.response?.data?.message || 'Failed to create post'
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        posts, 
        loading,
        error,
        fetchMyPosts,
        createPost
    }
})