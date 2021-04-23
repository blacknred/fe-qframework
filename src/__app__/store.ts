import { Getter, Setter, Store } from "../lib";

export type IAppStore = {
  todos: { id: number; text: string; done: boolean; endsAt?: Date }[];
  useForm: boolean;
  k: { i: number };
};

type IAppGetters = {
  todosByDate: Getter<IAppStore>;
};

type IAppSetters = {
  deleteTodosByDate: Setter<IAppStore>;
};

const store = new Store<IAppStore, IAppGetters, IAppSetters>({
  debug: true,
  persist: "localstorage",
  immutable: true,
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
