import { defineStore } from "pinia";
import axios from "axios";

export const useMyTask =  defineStore('myTask',{
    state : () => ({
        tasks: [],
        name:"App Task",
        loading:false
    }),
    getters: {
        favs() {
            return this.tasks.filter((task) => task.isFav)
        },
        favCount:(state) => {
            const data = state.tasks.filter((task) => !task.isFav == false);
            return data.length;
        },
        totalCount(state) {
            return state.tasks.length;
        }
    },
    actions: {
        async getTask() {
            this.loading = true;
            const res = await fetch('http://localhost:3000/tasks');
            const data = await res.json();

            this.tasks = data;
            this.loading = false;
        },
        async addTask(task) {
            this.tasks.push(task);

            const res = await axios.post("http://localhost:3000/tasks",task);
        },
        async removeTask(id) {
            this.tasks = this.tasks.filter((task) => task.id !== id);

            await axios.delete("http://localhost:3000/tasks/" + id);
        },
        async favoriteTask(id) {
            const task = this.tasks.find(t => t.id === id);
            task.isFav = !task.isFav

            await axios.patch("http://localhost:3000/tasks/" + id, {isFav:task.isFav});
        }
    }
})