<template >
    <Header></Header>
    <v-container fluid class="px-12 py-10">
        <v-card>
            <v-card-title class="d-flex align-center ">
                Users
                <v-spacer/>
                <v-text-field
                    v-model="search"
                    placeholder="Search by ID or username"
                    density="compact"
                    hide-details
                    clearable
                    style="max-width: 250px;"
                    @update:model-value="onSearch"
                />
            </v-card-title>

            <v-alert
                v-if="usersStore.error"
                type="error"
                variant="tonal"
                class="mt-2"
                >
                {{ usersStore.error }}
            </v-alert>


            <v-data-table-server
                :headers="headers"
                :items="usersStore.users"
                :loading="usersStore.loading"
                item-key="id"
                :items-per-page="usersStore.limit"
                :page="usersStore.page"
                :items-length="usersStore.meta.total"
                class="elevation-1"
                @update:sort-by="onSort"
                @update:page="usersStore.changePage"
                @update:items-per-page="usersStore.changeLimit"
                
            >
                <template #item.actions="{item}">
                    <v-btn
                        size="small"
                        color="error"
                        @click="onDelete(item.id)"
                        >
                        Delete
                    </v-btn>

                </template>

            </v-data-table-server>

            <v-divider/>

        </v-card>
    </v-container>
</template>

<script setup>
import Header from '../components/Header.vue';
import { computed, onMounted, ref } from 'vue';
import { useUsersStore } from '../stores/users.store';
import { useAuthStore } from '../stores/auth.store';
const usersStore = useUsersStore()
const authStore = useAuthStore()
const search = ref('')

const headers = [
    {title: 'ID', key: 'id'},
    {title: 'Username', key: 'username', sortable: true},
    {title: 'Email', key: 'email', sortable: true},
    {title: 'Actions', key: 'actions', sortable: false}
]

const pageCount = computed(() => usersStore.meta.lastPage)


const onSearch = () => {
    usersStore.setSearch(search.value)
}

const onSort = (sort) => {
    if(sort?.length) {
        usersStore.setSort(sort[0].key)
    }
}

const onDelete = async(id) => {
    const confirmDelete = confirm('Are you sure?')
    if (!confirmDelete) return

    const success = await usersStore.deleteUser(id)
    if (!success) return

    if (id === authStore.user.id) {
        authStore.logout()
        router.replace('/login')
        return
    }

    usersStore.fetchUsers()
}

onMounted(() => {
    usersStore.fetchUsers()
})



</script>