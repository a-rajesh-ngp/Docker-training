<template>
    <Header></Header>

    <v-container class="px-12 py-10">
        <v-card max-width="500" class="mx-auto">
            <v-card-text>
                <v-text-field
                    v-model="email"
                    label="New Email"
                    type="email"
                    variant="outlined"
                    @update:model-value="usersStore.error = null"
                    required
                />

                <v-alert 
                    v-if="usersStore.error"
                    type="error"
                    variant="tonal"
                    class="mt-2"
                >
                    {{ usersStore.error }}
                </v-alert>
            </v-card-text>

            <v-card-actions class="justify-end">
                <v-btn
                    color="primary"
                    :loading="usersStore.loading"
                    @click="submit"
                >
                    Update
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import Header from '../components/Header.vue';
import { useUsersStore } from '../stores/users.store';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';

const usersStore = useUsersStore()
const authStore = useAuthStore()
const router = useRouter()

const email= ref('')

onMounted(() => {
    // authStore.restoreSession()
    email.value = authStore.user?.email || ''
})

const submit = async() => {
    if(!email.value) {
        alert('Email is required')
        return
    }
    
    try {
        await usersStore.updateEmail(email.value)
        alert('Email updated successfully')
        authStore.logout()
        router.replace('/login')
    } catch(err) {
        console.error(err)
    }
}

</script>