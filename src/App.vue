<template>
  <div>
      <header>
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
          <h1>{{ myTask.name }}</h1>
      </header>
      
      <div class="new-task-form">
          <TaskForm />
      </div>

      <nav class="filter">
        <button @click="setFilter('all')">All Task</button>
        <button @click="setFilter('favs')">Favorite Task</button>
      </nav>

      <div v-if="myTask.loading">Loading....</div>

      <div v-if="myTask.loading == false" class="task-list">
        <p v-if="isFav == false">You have {{ myTask.totalCount }} tasks</p>
        <p v-else>You have {{ myTask.favCount }} favorite tasks</p>
        <div v-if="filter === 'all'" v-for="task in myTask.tasks">
          <TaskDetail :task="task"/>
        </div>
        <div v-if="filter === 'favs'" v-for="task in myTask.favs">
            <TaskDetail :task="task"/>
          </div>
      </div>

      <button @click="myTask.$reset">Reset</button>

  </div>
</template>

<script setup>
  import { ref,watch,onMounted } from 'vue';
  import { useMyTask } from './stores/TaskStore.js';
  import TaskDetail from "./components/TaskDetail.vue";
  import TaskForm from './components/TaskForm.vue';

  const myTask = useMyTask();
  const filter = ref('all');
  const isFav = ref(false);

  const setFilter = (value) => {
    filter.value = value;
    if(value == 'all') {
      isFav.value = false;
    }else if(value == 'favs') {
      isFav.value = true
    }
  }

  onMounted(() => {
    myTask.getTask();
  });


</script>

<style  scoped>

</style>

