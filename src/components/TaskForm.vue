<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="i need to..." v-model="newTask">
            <button type="submit">Add</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useMyTask } from '../stores/TaskStore.js';

    const myTask = useMyTask();
    const newTask = ref('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newTask.value.length > 0) {
            const data = {
                id:Math.floor(Math.random() * 100),
                title:newTask.value,
                isFav:false,
            };
            myTask.addTask(data);
            newTask.value = '';
        }
    }



</script>

<style scoped>

</style>