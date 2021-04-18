import { Store } from "../lib";

const store = new Store({
  title: "App",
  useForm: true,
  todos: []
});

// setInterval(() => (store.data.todos.push(99)), 3000);

export default store;
