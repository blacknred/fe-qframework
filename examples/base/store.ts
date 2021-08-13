import { Getter, Setter, Store } from "../../src";

export type AppStore = {
  freeze: boolean;
  sort?: "date" | "actualize";
  todos: { id: number; text: string; done: boolean; endsAt?: string }[];
  // k: { i: number };
};

type AppGetters = {
  todosByDate: Getter<AppStore>;
};

type AppSetters = {
  deleteTodosByDate: Setter<AppStore>;
};

export default new Store<AppStore, AppGetters, AppSetters>({
  debug: true,
  persist: "localstorage",
  // immutable: true,
  data: {
    freeze: false,
    todos: []
    // k: { i: 9 }
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
