import { Store } from "../lib";

export interface IAppStore {
  todos: { id: number; text: string; done: boolean; endsAt?: Date }[];
  useForm: boolean;
  k: { i: number };
}

interface IAppGetters {
  todosByDate: Function;
}

interface IAppSetters {
  deleteTodosByDate: Function;
}

const store = new Store<IAppStore>({
  debug: true,
  persist: true,
  data: {
    useForm: true,
    todos: [],
    k: { i: 9 }
  },
  getters: {
    todosByDate(data, date) {
      return data.todos.filter((t) => t.endsAt === date);
    }
  },
  setters: {
    deleteTodosByDate(data, date) {
      data.todos = data.todos.filter((t) => t.endsAt === date);
    }
  }
});

store.get("todosByDate");
store.set("deleteTodosByDate", null);
export default store;
