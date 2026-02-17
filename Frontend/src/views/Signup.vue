<template>
    <Header></Header>
    <v-container class="fill-height" fluid>
        <v-row  justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card elevation="8">
                    <v-card-title class="text-center">
                        Create Account
                    </v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="submitSignup">
                    
                            <v-text-field 
                                v-model="firstName"
                                label="First Name"
                                variant="outlined"
                                prepend-inner-icon="mdi-account"
                                required
                            />
                            <v-text-field 
                                v-model="lastName"
                                label="Last Name"
                                variant="outlined"
                                prepend-inner-icon="mdi-account-outline"
                                required
                            />
                            <v-text-field
                                v-model="email"
                                label="Email"
                                variant="outlined"
                                prepend-inner-icon="mdi-email"
                                type="email"
                                required
                            />
                            <v-select 
                                v-model="role"
                                :items = "roles"
                                label="Role"
                                variant="outlined"
                                prepend-inner-icon="mdi-account-badge"
                                required
                            />
                            <v-text-field 
                                v-model="password"
                                label="Password"
                                variant="outlined"
                                prepend-inner-icon="mdi-lock"
                                type="password"
                                required
                            />
                            <v-text-field
                                v-model="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                prepend-inner-icon="mdi-lock-check"
                                type="password"
                                required
                            />
                            <v-btn
                                block
                                color="primary"
                                :loading="authStore.loading"
                                type="submit"
                                >
                                Sign up
                            </v-btn>
                            
                            <v-alert
                                v-if="authStore.error"
                                type="error"
                                variant="tonal"
                                class="mt-2"
                                density="compact"
                            >
                                {{ authStore.error }}
                            </v-alert>

                            <div class="d-flex justify-center align-center mt-4">
                                <span class="text-body-2 " >
                                    Already have an account?
                                </span>
                                <v-btn
                                    variant="text"
                                    color="primary"
                                    class="text-none pa-0"
                                    @click="navigateToLoginPage"
                                >
                                    Login
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    // import { vAutoFocus } from '../directives/autoFocus';
    import Header from '../components/Header.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/auth.store';
    const router = useRouter();
    const authStore = useAuthStore()

    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const role = ref('user')
    const roles = ref([
        {title: 'User', value: 'user'},
        {title: 'Admin', value: 'admin'}
    ])

    const submitSignup = async() => {
        console.log('hi')
        if(password.value!==confirmPassword.value) {
            alert('Passwords do not match')
            return
        }
        const payload = {
            // firstname: firstName.value,
            // lastname: lastName.value,
            username: `${firstName.value}_${lastName.value}`,
            email: email.value,
            password: password.value,
            // role: role.value
        }
        console.log(payload)
        try {
            const res = await authStore.signup(payload)

            router.push({
                path: '/login'
            })
            
        } catch(err) {
            console.error(err.errors)
        }
    }

    const navigateToLoginPage = () => {
        router.push('/login')
    }

</script>