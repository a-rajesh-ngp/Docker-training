<template>
    <div class="page">
        <div class="card">
            <h1>Student Marks!</h1>
            <table v-if="isVisible" >
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for = "i in users" >
                        <td>{{i.name}}</td>
                        <td>{{ i.mark }}</td>
                    </tr>
                </tbody>
            </table>

            <p v-else> 
                Click <strong>Show</strong> button to view student marks
            </p>
        </div>
        <div class="btns">
            <button class="btnShow" @click="showUsers">Show Marks</button>
            <button class="btnHide" @click="hideUsers">Hide Marks</button>
        </div>
        <div class="counter">
            <h2>Counter Value: {{ count }}</h2>
            <button @click="increment">Increment</button>
            <button @click="decrement">Decrement</button>
            <button @click="reset">Reset</button>
        </div>
    </div>
</template>


<style>
html, body {
  margin: 0;
}

.card {
  background: rgba(255, 255, 255, 0.85);
  padding: 20px;
  border-radius: 8px;
}

.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;   
    align-items: center;     
}

table {
    border-collapse: collapse;
    width: 300px;
}
th {
    background-color: rgb(141, 252, 121);
}
th, td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
}
.btns {
    margin-top: 10px;
    display: flex;
    gap: 10px;
    /* padding: 10px; */
}
.btnShow {
    padding: 10px;
    background-color: rgb(165, 246, 165);
}
.btnHide {
    padding: 10px;
    background-color: rgb(165, 246, 165);

}
</style>


<script scoped>
import {ref} from 'vue'
import { counter } from '../composables/counter';

    export default {
        setup() {
            
            const users= ref([
                    {name: 'student1', mark: 90},
                    {name: 'student2', mark: 92},
                    {name: 'student3', mark: 80},
                    {name: 'student4', mark: 70},
                    {name: 'student5', mark: 60},
                    {name: 'student6', mark: 50},
                ]);
            const isVisible= ref(false);
            // const  count= ref(0);
        
            const showUsers= () => {
                isVisible.value = true
            };
            const hideUsers=() => {
                isVisible.value = false
            };
            // const incrementCount=()=> {
            //     count.value+=1
            // };
            // const decrementCount= ()=> {
            //     count.value-=1
            // };
            // const resetCount=() => {
            //     count.value =0
            // };

            const {
                count,
                increment,
                decrement,
                reset
            } = counter(0);

            return {
                users,
                isVisible,
                count,
                showUsers,
                hideUsers,
                increment,
                decrement,
                reset
            }
        }
    }
    
</script>