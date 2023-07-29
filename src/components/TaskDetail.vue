<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="deleteTask(task.id)">delete</i>
            <i class="material-icons" :class="{favorite: task.isFav}" @click="myState.favoriteTask(task.id)">favorite</i>
        </div>
    </div> 
</template>

<script setup>
    import { ref,defineProps } from 'vue';
    import { useMyTask } from '../stores/TaskStore.js';

    const props = defineProps(['task']);
    const myState = useMyTask();

    const deleteTask = (id) => {
        myState.removeTask(id);
    }
    

</script>

<style scoped>
    .favorite {
        color:red;
    }
</style>