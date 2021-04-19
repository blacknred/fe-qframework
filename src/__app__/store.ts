import { Store } from "../lib";

interface IStore {
  title: string;
  useForm: boolean;
  todos: number[];
}

const store = new Store<IStore>(
  {
    title: "App",
    useForm: true,
    todos: []
  },
  { debug: true, persister: true }
);

setInterval(() => store._data.todos.push(99), 5000);

export default store;
