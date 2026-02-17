<template>
    <form class="form" v-if="user" @submit.prevent="submitForm">
        <h2>
            <slot name="title"> 
                CREATE NEW USER 
            </slot>
        </h2> <br>
        <p>
            Enter firstname: <br>
            <input  v-model="user.firstname"
                v-autofocus
                v-uppercase
                @input="fieldsTouched.firstname = true"
                :class="{
                    'inputError': errors.firstname,
                    'inputSuccess': fieldsTouched.firstname && !errors.firstname 
                }"
                type="text"> <br>
            <span v-if="errors.firstname" >{{ errors.firstname }}</span>
        </p> <br>
        <p>
            Enter lastname: <br>
            <input v-model="user.lastname" 
                v-uppercase
                @input="fieldsTouched.lastname = true"
                :class="{
                    'inputError': errors.lastname,
                    'inputSuccess': fieldsTouched.lastname && !errors.lastname 
                }"
                type="text"> <br>
            <span v-if="errors.lastname" >{{ errors.lastname }}</span>
        </p> <br>
        <p >
            Full name: {{ fullname }}
        </p><br>
        <p>
            Enter age: <br> 
            <input v-model="user.age" 
                @input="fieldsTouched.age = true"
                :class="{
                    'inputError': errors.age,
                    'inputSuccess': fieldsTouched.age && !errors.age 
                }"
                type="text"> <br>
            <span v-if="errors.age" >{{ errors.age }}</span>
        </p> <br>
        <p>
            Enter email: <br>
            <input v-model="user.email" 
                @input="fieldsTouched.email = true"
                :class="{
                    'inputError': errors.email,
                    'inputSuccess': fieldsTouched.email && !errors.email 
                }"
                type="email"> <br>
            <span v-if="errors.email">{{ errors.email }}</span>
        </p> <br>
        <p>
            Enter phone number: <br>
            <input v-model="user.phone" 
                @input="fieldsTouched.phone = true"
                :class="{
                    'inputError': errors.phone,
                    'inputSuccess': fieldsTouched.phone && !errors.phone 
                }"
                type="text"> <br>
            <span v-if="errors.phone">{{ errors.phone }}</span>
        </p> <br>
        <p>
            Enter password: <br>
            <input v-model="user.password" 
                @input="fieldsTouched.password = true"
                :class="{
                    'inputError': errors.password,
                    'inputSuccess': fieldsTouched.password && !errors.password 
                }"
                type="password"> <br>
            <span v-if="errors.password" >{{ errors.password }}</span>
        </p> <br>
        <div class="btn"> 
            <slot name="actions">
                <button  type="submit" 

                    :disabled="!isFormValid"
                    :style="{
                        opacity: isFormValid ? 1 : 0.5,
                        cursor: isFormValid ? 'pointer' : 'not-allowed'
                    }"
                    >Create</button>
            </slot>
        </div>
    </form> <br>
</template>

<script setup>
    import { ref, computed, watch, onMounted } from 'vue'
    import { vUppercase } from '../directives/uppercase'
    import { vAutoFocus } from '../directives/autoFocus'

    const errors = ref({})
    const emit = defineEmits(['submit'])
    
    const user = defineModel()

    // const vUpperCase = {
        
    // }
    
  
    const fieldsTouched = ref({
        firstname: false,
        lastname: false,
        age: false,
        email: false,
        password: false,
        phone: false
    })
    
    const isFormValid = computed(() => {
        return (
            user.value.firstname.value &&
            user.value.lastname.value &&
            user.value.age.value &&
            user.value.email.value &&
            user.value.password.value &&
            user.value.phone.value &&
            Object.keys(errors.value).length === 0
        )
    })


    const fullname = computed(()=> {
        
        return `${user.value.firstname?? ""} ${user.value.lastname??""}`.trim()
    })


    watch(()=> user.value.firstname, (val) => {
        if (!fieldsTouched.value.firstname) return

        if (!val) {
            errors.value.firstname = 'Firstname is required'
        } else if (!/^[A-Za-z]+$/.test(val)) {
            errors.value.firstname = 'Firstname should have only alphabets'
        } else {
            delete errors.value.firstname
        }
    })
    watch(()=> user.value.lastname, (val) => {
        if (!fieldsTouched.value.lastname) return

        if (!val) {
            errors.value.lastname = 'Lastname is required'
        } else if (!/^[A-Za-z]+$/.test(val)) {
            errors.value.lastname = 'Lastname should have only alphabets'
        } else {
            delete errors.value.lastname
        }
    })
    watch(()=> user.value.age, (val) => {
        if (!fieldsTouched.value.age) return

        if (!val) {
            errors.value.age = 'Age is required'
        } else if (!/^[0-9]+$/.test(val)) {
            errors.value.age = 'Age should have only numbers'
        } else if (val < 1 || val > 100) {
            errors.value.age = 'Age should be between 1 and 100'
        } else {
            delete errors.value.age
        }
    })
    watch(()=> user.value.email, (val) => {
        if (!fieldsTouched.value.email) return

        if (!val) {
            errors.value.email = 'Email is required'
        } else if (
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)
        ) {
            errors.value.email = 'Invalid Email'
        } else {
            delete errors.value.email
        }
    })
    watch(()=> user.value.password, (val) => {
        if (!fieldsTouched.value.password) return

        if (!val) {
            errors.value.password = 'Password is required'
        } else if (!/[a-zA-Z]/.test(val)) {
            errors.value.password = 'Password should have atleast one alphabet'
        } else if (!/[0-9]/.test(val)) {
            errors.value.password = 'Password should have atleast one number'
        } else if (!/[^a-zA-Z0-9]/.test(val)) {
            errors.value.password = 'Password should have atleast one special character'
        } else if (val.length < 6) {
            errors.value.password = 'Password length should be at least 6'
        } else {
            delete errors.value.password
        }
    })
    watch(()=> user.value.phone, (val) => {
        if (!fieldsTouched.value.phone) return

        if (!val) {
            errors.value.phone = 'Phone number is required'
        } else if (!/^[0-9]{10}$/.test(val)) {
            errors.value.phone = 'Phone number must be 10 digits'
        } else {
            delete errors.value.phone
        }
    })

    const validate = () => {
        const newErrors = {}

        if (!user.value.age) {
            newErrors.age = 'Age is required'
        } 

        if (!user.value.firstname) {
            newErrors.firstname = 'Username is required'
        } 

        if(!user.value.lastname) {
            newErrors.lastname = 'Lastname is required'
        }

        if (!user.value.email) {
            newErrors.email = 'Email is required'
            
        } 

        if (!user.value.password) {
            newErrors.password = 'Password is required'
        } 

        if (!user.value.phone) {
            newErrors.phone = 'Phone number is required'
        } 

        errors.value = newErrors
        return Object.keys(errors.value).length === 0
    }


    const submitForm = () => {
        if(!validate()) return

        emit('submit')

        // firstname.value = ''
        // lastname.value = ''
        // email.value = ''
        // password.value = ''
        // phone.value = ''
        // age.value = ''

        errors.value = {}
        Object.keys(fieldsTouched.value).forEach(key => {
            fieldsTouched.value[key] = false
        })
    }
</script>



<style scoped>


.inputError {
    border-color: red;
    background-color: #ffecec;
}

.inputSuccess {
    border-color: green !important;
    background-color: #ecffec;
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
    background-color: rgb(75, 145, 175);
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
.form {
    width: 40%;
    background-color: white;
    padding: 20px;
    margin: 10px;
    border: 2px solid rgb(150, 223, 250);
    border-radius: 5px;
}

input {
    width: 50%;
    padding: 8px;
    margin: 10px 0;
    border: 2px solid rgb(150, 223, 250);
    border-radius: 5px;
    background-color: rgb(228, 240, 245);
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
    background-color: rgb(80, 187, 253);
    color: aliceblue;
    border-radius: 5px;
}
</style>