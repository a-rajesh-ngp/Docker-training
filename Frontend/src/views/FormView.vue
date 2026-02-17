<template>
    <div class="page">
    <div class="formDiv">
        <form class="form" @submit.prevent="addNewUser">
            <h2>CREATE NEW USER </h2> <br>
            <p>
                Enter username: <br>
                <input v-model="uname" type="text"> <br>
                <span v-if="errors.uname" >{{ errors.uname }}</span>
            </p> <br>
            <p>
                Enter age: <br>
                <input v-model="age" type="text"> <br>
                <span v-if="errors.age" >{{ errors.age }}</span>
            </p> <br>
            <p>
                Enter email: <br>
                <input v-model="email" type="email"> <br>
                <span v-if="errors.email">{{ errors.email }}</span>
            </p> <br>
            <p>
                Enter phone number: <br>
                <input v-model="phone" type="text"> <br>
                <span v-if="errors.phone">{{ errors.phone }}</span>
            </p> <br>
            <p>
                Enter password: <br>
                <input v-model="pwd" type="password"> <br>
                <span v-if="errors.pwd" >{{ errors.pwd }}</span>
            </p> <br>
            <div class="btn"> 
                <button type="submit" >Create</button>
            </div>
        </form> <br>
    </div>
    <div class="table" v-if="users.length">
        <table >
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>age</th>
                    <th>Phone</th>
                </tr>
                    
            </thead>
            <tbody>
                <tr v-for="i in users">
                    <td>{{i.username}}</td>
                    <td>{{ i.email }}</td>
                    <td>{{ i.password }}</td>
                    <td>{{ i.age }}</td>
                    <td>{{ i.phone }}</td>
                </tr>
            </tbody>
        </table>
    </div><br>
    </div>
</template>

<style scoped>
.page {
    /* width: 100%; */
    /* background-image: url('@/assets/bgCreateUserView.avif'); */
}

.table {
    width: 100%;
    display: flex;
    justify-content: center;
}
table {
    border-collapse: collapse;
    /* max-width: 500px; */
    table-layout: fixed;
    border-radius: 8px;
    background-color: #ffffff;
}

th {
    background-color: rgb(157, 75, 175);
    color: whitesmoke;
    font-weight: 600;
}

th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;

    /* word-wrap: break-word;
    word-break: break-word;
    white-space: normal; */
    overflow-wrap: anywhere;

}

span {
    color: #dd0c0c;
}
h2 {
    width: 100%;
    display: flex;
    justify-content: center;
}
.formDiv {
    /* width: 100%; */
    display: flex;
    justify-content: center;
}
.form {
    width: 40%;
    background-color: white;
    padding: 20px;
    margin: 10px;
    border: 2px solid blueviolet;
    border-radius: 5px;
}

input {
    width: 50%;
    padding: 8px;
    margin: 10px 0;
    border: 2px solid blueviolet;
    border-radius: 5px;
    background-color: rgb(245, 228, 242);
    color: #080808;
}
.btn {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
}
button {
    width: 90%;
    padding: 10px;
    background-color: rgb(169, 80, 253);
    color: aliceblue;
    border-radius: 5px;
}
</style>

<script setup>
    import {  ref } from 'vue'

    

    const users = ref([])

    const uname = ref('')
    const email = ref('')
    const pwd = ref('')
    const phone = ref('')
    const age = ref('')
    const errors = ref({})

    const validate = () => {
        const newErrors = {}

        if (!age.value) {
            newErrors.age = 'Age is required'
        } else if (!/^[0-9]+$/.test(age.value)) {
            newErrors.age = 'Age should have only numbers'
        } else if (age.value < 1 || age.value > 100) {
            newErrors.age = 'Age should be between 1 and 100'
        }

        if (!uname.value) {
            newErrors.uname = 'Username is required'
        } else if (uname.value.length < 3) {
            newErrors.uname = 'Username length should be at least 3'
        } else if (!/^[A-Za-z]+$/.test(uname.value)) {
            newErrors.uname = 'Username should have only alphabets'
        }

        if (!email.value) {
            newErrors.email = 'Email is required'
        } else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)) {
            newErrors.email = 'Invalid Email.'
        }

        if (!pwd.value) {
            newErrors.pwd = 'Password is required'
        } else if (!/[a-zA-Z]/.test(pwd.value)) {
            newErrors.pwd = 'Password should have at least one alphabet'
        } else if (!/[0-9]/.test(pwd.value)) {
            newErrors.pwd = 'Password should have at least one number'
        } else if (!/[^a-zA-Z0-9]/.test(pwd.value)) {
            newErrors.pwd = 'Password should have at least one special character'
        } else if (pwd.value.length < 6) {
            newErrors.pwd = 'Password length should be at least 6'
        }

        if (!phone.value) {
            newErrors.phone = 'Phone number is required'
        } else if (!/^[0-9]{10}$/.test(phone.value)) {
            newErrors.phone = 'Phone number must be 10 digits'
        }

        errors.value = newErrors
        return Object.keys(newErrors).length === 0
    }

    const addNewUser = () => {
        if (!validate()) return

        users.value.push({
            username: uname.value,
            email: email.value,
            password: pwd.value,
            age: age.value,
            phone: phone.value
        })

        uname.value = ''
        email.value = ''
        pwd.value = ''
        phone.value = ''
        age.value = ''
        errors.value = {}
    }
</script>