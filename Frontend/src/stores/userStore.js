import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore('user', () => {
    const users = ref([
        {
            id: 1,
            firstname: "Rajesh",
            lastname: "Kumar",
            email: "rajesh@gmail.com",
            password: "pass123",
            age: 28,
            phone: "9876543210"
        },
        {
            id: 2,
            firstname: "Anita",
            lastname: "Sharma",
            email: "anita@gmail.com",
            password: "anita@123",
            age: 25,
            phone: "9123456780"
        },
        {
            id: 3,
            firstname: "Amit",
            lastname: "Verma",
            email: "amit@gmail.com",
            password: "amit@456",
            age: 32,
            phone: "9988776655"
        },
        {
            id: 4,
            firstname: "Priya",
            lastname: "Singh",
            email: "priya@gmail.com",
            password: "priya@789",
            age: 27,
            phone: "9090909090"
        },
        {
            id: 5,
            firstname: "Karthik",
            lastname: "Rao",
            email: "karthik@gmail.com",
            password: "kart@321",
            age: 30,
            phone: "9012345678"
        },
        {
            id: 6,
            firstname: "Neha",
            lastname: "Gupta",
            email: "neha@gmail.com",
            password: "neha@111",
            age: 26,
            phone: "9345678901"
        }
    ])


    const totalUsers = computed(()=> users.value.length)

    const addUser = (user)=> {
        users.value.push({id: Date.now(),...user})
    }

    const getUserById = (id) => {
        return users.value.find(u => u.id === Number(id))
    }

    const updateUser = (user) => {
        console.log(user)
        const index = users.value.findIndex(u => Number(u.id) === Number(user.id))
        console.log('index ', index)
        if(index!==-1) {
            users.value[index] = {
                id: users.value[index].id,
                ...user}
        }
    }

    const deleteUser = (user) => {
        users.value = users.value.filter(u => Number(u.id) !== Number(user.id))
    }

    const clearUsers = () => {
        users.value = []
    }

    return {
        users,
        totalUsers,
        addUser,
        deleteUser,
        clearUsers,
        getUserById,
        updateUser
    }

})