<template>
    <div class="search">
        <v-text-field
            v-model="search"
            type="text"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search by firstname..."
            max-width="300"
            density="compact"
        />
    </div>
    <div>
        <UserTable 
            :users="paginatedUsersData" 
            :columns="columns" 
            @delete-user="requestDelete"
            @update-user="goToEdit"
            >
        </UserTable>
        <ConfirmDialog
            v-model="userToDelete"
        >
            <template #title>
                Delete User
            </template>
            <template #default>
                <p> 
                    Are you sure you want to delete the data of
                    <strong>
                        {{ userToDelete?.firstname }} {{ userToDelete?.lastname }}
                    </strong>?
                </p>
                <p class="text-caption text-grey">
                    Email: {{ userToDelete?.email }}
                </p>
            </template>
            <template #actions="{close}">
                <v-btn variant="text" @click="close"> 
                    Cancel
                </v-btn>
                <v-btn color="red" @click="confirmDelete" >
                    Delete
                </v-btn>
            </template>
            
        </ConfirmDialog>

    </div>
    <!-- <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage===1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="currentPage++" :disabled="currentPage===totalPages">Next</button>
    </div> -->

</template>

<script setup>
    import { computed, ref, watch } from 'vue';
    import UserTable from '../components/UserTable.vue'
    import { useUserStore } from '../stores/userStore';
    import ConfirmDialog from '../components/ConfirmDialog.vue';
    import router from '../router';

    const userToDelete = ref(null)

    const requestDelete = (user) => {
        console.log(user)
        userToDelete.value = user
    }

    const goToEdit = (user) => {
        router.push(`/form2/${user.id}`)
    }

    const confirmDelete = () => {
        if(!userToDelete.value) return
        userStore.deleteUser(userToDelete.value)
        userToDelete.value = null
    }

    const userStore = useUserStore()
    const columns = [
        { key: 'firstname', label: 'Firstname' },
        { key: 'lastname', label: 'Lastname' },
        { key: 'email', label: 'Email' },
        { key: 'password', label: 'Password' },
        { key: 'age', label: 'Age' },
        { key: 'phone', label: 'Phone' }
    ]

    const search = ref('')
    const filteredUsers = computed(()=> {
        const q = search.value.trim()
        if(!q) return userStore.users;

        return userStore.users.filter(user=> 
            user.firstname
                .toLowerCase()
                .includes(q.toLowerCase())
        )
    })

    const recordsPerPage = 10
    const currentPage = ref(1)

    const totalPages = computed(()=> {
        const pages = Math.ceil(filteredUsers.value.length / recordsPerPage)
        return pages === 0 ? 1 : pages
    })

    const paginatedUsersData = computed(() => {
        const start = (currentPage.value -1) * recordsPerPage
        return filteredUsers.value.slice(start, start + recordsPerPage)
    })

    watch(filteredUsers, ()=> {
        currentPage.value=1
    }) 


</script>

<style scoped>
input {
    display: flex;
    align-items: center;
    margin-bottom: 15px; 
    padding: 8px; 
    width: 250px;
}
.search {
    display: flex;
    justify-content: center;

}

:deep(.v-field) {
    border-radius: 8px;
}

:deep(.v-field__input) {
    font-size: 14px;
}

</style>