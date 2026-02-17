<template>
    <v-app-bar :color="isDark? 'grey-darken-4' : 'primary'">
        <v-app-bar-title 
            class="cursor-pointer"
            @click="goUsers"
            >
            User Management
        </v-app-bar-title>
        <v-spacer />

        <v-btn v-if="authStore.isAuthenticated" variant="text" to="/dashboard">
            JWT Payload
        </v-btn>
        <v-btn v-if="authStore.isAuthenticated" variant="text" @click="goUsers">
            Users
        </v-btn>
        <v-btn v-if="authStore.isAuthenticated" variant="text" @click="goPosts">
            Create Post
        </v-btn>
        <v-btn v-if="authStore.isAuthenticated" variant="text" to="/updateEmail">
            Update Email
        </v-btn>
        <v-btn icon @click="themeStore.toggleTheme">
            <v-icon>
                {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
            </v-icon>
        </v-btn>
        <v-btn 
            v-if="authStore.isAuthenticated"
            icon
            color="red"
            class="mr-2"
            @click="logout">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        <slot name="btn"></slot>
    </v-app-bar>
</template>

<script setup>
    import { inject, computed } from 'vue';
    import { useThemeStore } from '../stores/theme.store';
    import { useRouter } from 'vue-router';
    import { useUsersStore } from '../stores/users.store';
    import { useAuthStore } from '../stores/auth.store';
    
    const authStore = useAuthStore()
    const usersStore = useUsersStore()

    // const theme = inject('theme')
    // const toggleTheme = inject('toggleTheme')

    const router= useRouter()
    const themeStore = useThemeStore()
    const isDark = computed(()=> themeStore.theme==='dark')

    const goUsers = () => {
        router.push('/users')
    }
    const goProfile = () => {
        router.push('/profile')
    }
    const goPosts = () => {
        router.push('/posts')
    }

    const logout = () => {
        authStore.logout()
        router.push('/login')
    }
</script>

