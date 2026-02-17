<template>
    <div class="page">
        <div class="formDiv">
            <UserForm v-model="user" @submit = "addNewUser">
                <template #title>
                    {{isEditMode? 'Update User' : 'Register'}}
                </template>
                <template #actions>
                    <v-btn color="primary" type="submit" >{{isEditMode? 'Update': 'Save'}}</v-btn>
                </template>
            </UserForm>
        </div>
        <ConfirmDialog v-model="userToUpdate">
            <template #title>Confirm Update</template>
            <template #default>
                Are you sure you want to update the data of
                <strong>
                {{ userToUpdate?.firstname }} {{ userToUpdate?.lastname }}
                </strong>?
            </template>
            <template #actions="{close}">
                <v-btn 
                    variant="text"
                    @click="close"
                >
                    Cancel
                </v-btn>
                <v-btn 
                    variant="text"
                    color="primary"
                    @click="confirmUpdate"
                >
                    Update
                </v-btn>
            </template>
        </ConfirmDialog>
    </div>
<!-- <UserTable 
    :users="userStore.users" 
    :columns="columns" 
    @deleteUser="userStore.deleteUser"
    >
</UserTable> -->
</template>

<script setup>
    import { useUserStore } from '../stores/userStore'
    import { useRouter, useRoute } from 'vue-router'
    import ConfirmDialog from '../components/ConfirmDialog.vue'
    import { computed, onMounted, ref } from 'vue'
    import UserForm from '../components/UserForm.vue'

    const router = useRouter()
    const route = useRoute()
    const userStore = useUserStore()
    const user= ref({
        id: '',
        firstname: '',
        lastname: '',
        age: '',
        email: '',
        phone: '',
        password: ''
    })
    const userToUpdate = ref(null)

    const confirmUpdate = () => {
        if (!userToUpdate.value) return
        userStore.updateUser(userToUpdate.value)
        userStore.value = null
        router.push('/listUsers')
    }

    const isEditMode = computed(()=> !!route.params.id)

    onMounted(() => {
        if(isEditMode) {
            const userData = userStore.getUserById(route.params.id)
            if(userData) {
                user.value = {...userData}
            }
        }
    })


    const addNewUser = () => {
        if (isEditMode) {
            userToUpdate.value = { ...user.value }
            // console.log(userToUpdate.value)
        } else {
            userStore.addUser({...user.value})
            user.value = {
                firstname: '',
                lastname: '',
                age: '',
                email: '',
                phone: '',
                password: ''
            }
            router.push('/listUsers')
        }

    }
</script>

<style scoped>
.formDiv {
    /* width: 100%; */
    display: flex;
    justify-content: center;
}
</style>