<template >
    <Header>
       
    </Header>
    <v-container>
        <v-card elevation="6">
            <v-card-title>
                JWT Payload Details
            </v-card-title>

            <v-card-text v-if="user">
                <p><strong>User Id: </strong> {{user.userId}}</p>
                <p><strong>Email: </strong> {{user.email}}</p>
                <p><strong>Issued At: </strong> {{ formatDate(user.iat) }}</p>
                <p><strong>Expires At: </strong> {{ formatDate(user.exp) }}</p>
            </v-card-text>
            <v-alert v-else
                type="error"
                density="compact"
                variant="tonal"
            >
                User not authenticated
            </v-alert>

          

        </v-card>
    </v-container>
</template>

<script setup>
    import { useAuthStore } from '../stores/auth.store';
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import Header from '../components/Header.vue';

    const authStore = useAuthStore()
    const router = useRouter()
    const user = computed(() => {
        return authStore.user
    }) 

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString()
    }

  


</script>