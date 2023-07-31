<script>
import StatusFilter from "@/components/StatusFilter.vue";
import TodoItem from "@/components/TodoItem.vue";
import {createTodos, getTodos, removeTodo, updateTodo} from "@/dal/apiTodos";

export default {
  components: {
    StatusFilter,
    TodoItem,
  },

  data() {
    let todos = [];
    const jsonData = localStorage.getItem('todos') || '[]';

    try {
      todos = JSON.parse(jsonData);
    } catch (err) {
    }

    return {
      todos: [],
      title: '',
      status: 'all',
    }
  },

  computed: {
    activeTodos() {
      return this.todos.filter(todo => !todo.completed);
    },

    completedTodos() {
      return this.todos.filter(todo => todo.completed);
    },

    visibleTodos() {
      switch (this.status) {
        case "active":
          return this.activeTodos

        case "completed":
          return this.completedTodos

        default:
          return this.todos;
      }
    },
  },

  mounted() {
    getTodos()
      .then(({data}) => {
        this.todos = data
      })
  },

  methods: {
    handleSubmitForm() {
      createTodos(this.title)
        .then(({data}) => {
          this.todos.push(data);
          this.title = '';
        })
    },

    updateTodo({ id, title, completed }) {
      updateTodo({ id, title, completed })
        .then(({data}) => {
          this.todos = this.todos.map(
            todo => todo.id !== id ? todo : data
          )
        })
    },

    removeTodo(todoId) {
      removeTodo(todoId)
        .then(() => {
					this.todos =this.todos.filter(({id}) => id !== todoId);
        });
    }
  },
}
</script>

<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button class="todoapp__toggle-all"
                :class="{active: activeTodos.length === 0}"
        ></button>

        <form @submit.prevent="handleSubmitForm">
          <input
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
            v-model="title"
          />
        </form>
      </header>

      <TransitionGroup
        name="list"
        tag="section"
        class="todoapp__main"
      >
        <TodoItem
          v-for="todo, index of visibleTodos"
          :key="todo.id"
          :todo="todo"
          @update="updateTodo"
          @remove="removeTodo(todo.id)"
        />
      </TransitionGroup>

      <footer class="todoapp__footer">
        <span class="todo-count">
          {{ activeTodos.length }} items left
        </span>

        <StatusFilter
          v-model="status"
        />

        <button
          class="todoapp__clear-completed"
          v-if="activeTodos.length > 0"
        >
          Clear completed
        </button>
      </footer>
    </div>

    <article class="message is-danger message--hidden">
      <div class="message-header">
        <p>Error</p>
        <button class="delete"></button>
      </div>

      <div class="message-body">
        Unable to add a Todo
      </div>
    </article>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  max-height: 60px;
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  max-height: 0;
  transform: scaleY(0);
}
</style>
