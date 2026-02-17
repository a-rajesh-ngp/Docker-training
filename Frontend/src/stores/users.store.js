import { defineStore } from "pinia";
import { deleteUser, getUsersApi, updateEmailApi } from "../services/users.service";
import { useAuthStore } from "./auth.store";


export const useUsersStore = defineStore('users', {
    state: () => ({
        users: [],

        meta: {
            total:0,
            perPage: 10,
            currentPage: 1,
            lastPage: 1
        },

        page:1,
        limit: 10,
        search: '',
        sortColumn: 'username',
        sortDirection: 'asc',
        
        loading: false,
        error: null,    
    }),
    actions: {
        async fetchUsers() {
            try {
                this.loading = true
                this.error = null

                const res = await getUsersApi(this.page, this.limit, this.search, this.sortColumn, this.sortDirection)

                this.users = res.data.data.data
                const backendMeta = res.data.data.meta

                this.meta.total = backendMeta.total
                this.meta.perPage = backendMeta.perPage
                this.meta.currentPage = backendMeta.currentPage
                this.meta.lastPage = backendMeta.lastPage

                console.log('Backend meta:', res.data.data.meta)

                this.limit = this.meta.perPage
                this.page = this.meta.currentPage

            } catch(err) {
                this.error = err.response?.data?.message || 'Failed to fetch users'
            } finally {
                this.loading = false
            }
        },

        changeLimit(limit) {
            this.limit = limit
            this.page = 1
            this.fetchUsers()
        },

        changePage(page) {
            this.page = page
            this.fetchUsers()
        },

        setSearch(search) {
            this.search = search 
            this.page = 1
            this.fetchUsers()  
        },

        setSort(column) {
            if(this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
            } else {
                this.sortColumn = column
                this.sortDirection === 'asc'
            }
            this.fetchUsers()
        },

        async updateEmail(email) {
            try {
                this.loading = true
                this.error = null

                const authStore = useAuthStore()
                if(!authStore.user?.userId) {
                    throw new Error('User not found')
                }

                await updateEmailApi(authStore.user?.userId, {'email': email})
                authStore.user.email = email

            } catch (err) {
                const data = err.response?.data

                if (data?.errors?.length) {
                    this.error = data.errors[0].message
                } else {
                    this.error = data?.message || 'Failed to update email'
                }

                throw err
            } finally {
                this.loading = false
            }
        },

        async deleteUser(id) {
            this.loading = true
            this.error = null

            try {
                await deleteUser(id)
                return true

            } catch(err) {
                this.error = err.response?.data?.message || 'Failed to delete user'
                return false
            } finally {
                this.loading = false
            }
        }
    }
})